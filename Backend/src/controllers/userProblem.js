
const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");

const Problem = require("../models/problems");

const User = require("../models/user");

const Submission = require("../models/submission")


const createProblem = async (req,res) =>{

    const {title,description,difficulty,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;

        try{
            for(const {language,completeCode} of referenceSolution){
                 const languageId = getLanguageById(language);

                const submission = visibleTestCases.map(testcase => ({
                    source_code : completeCode,
                    language_id : languageId,
                    stdin : testcase.input,
                    expected_output : testcase.output
                }));          

                const submitResult = await submitBatch(submission);
            
                const resultToken = submitResult.map((value) => value.token);

                const testResult = await submitToken(resultToken);

                for(const test of testResult){
                    if(test.status.id != 3){
                        if(test.status.id == 4)
                        return res.status(400).send("Wrong Answer");
                        else if(test.status.id == 5)
                        return res.status(400).send("Time Limit Excedded");
                        else if(test.status.id == 6)
                        return res.status(400).send("Compilation Error");
                        else
                        return res.status(400).send("Runtime Error");
                    }
                }
            }

            //now we can store the problems and their data in db
  
            await Problem.create({
                ...req.body,
                problemCreator : req.result._id
            })

            res.status(200).send("Problem Saved Successfully");

        }catch(err){
             res.status(400).send("Erro" + err);
        }
}

const updateProblem = async (req,res) => {
 
    const {id} = req.params;

    const {title,description,difficulty,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;

        try{

            if(!id)
                return res.status(400).send("Missing Id field");

            const dsaProblem = await Problem.findById(id);
            if(!dsaProblem){
                return res.status(404).send("Id is not present");
            }


            for(const {language,completeCode} of referenceSolution){
                 const languageId = getLanguageById(language);

                const submission = visibleTestCases.map(testcase => ({
                    source_code : completeCode,
                    language_id : languageId,
                    stdin : testcase.input,
                    expected_output : testcase.output
                }));          

                const submitResult = await submitBatch(submission);
            
                const resultToken = submitResult.map((value) => value.token);

                const testResult = await submitToken(resultToken);

                for(const test of testResult){
                    if(test.status.id != 3){
                        if(test.status.id == 4)
                        return res.status(400).send("Wrong Answer");
                        else if(test.status.id == 5)
                        return res.status(400).send("Time Limit Excedded");
                        else if(test.status.id == 6)
                        return res.status(400).send("Compilation Error");
                        else
                        return res.status(400).send("Runtime Error");
                    }
                }
            }

           const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators: true,new: true} );
          
           res.status(200).send(newProblem);


        }catch(err){
             res.status(400).send("Error" + err);
        }
}

const deleteProblem = async (req,res) => {
    const {id} = req.params;

    try{
        if(!id)
            return res.status(400).send("Id is missing");

        const deletedProblem = await Problem.findByIdAndDelete(id);

        if(!deletedProblem)
            return res.status(404).send("Problem is missing");

        res.status(200).send("successfully deleted");
    }catch(err){

        res.status(500).send("Error: " + err);
    }
}

const getProblemById = async (req,res) => {
    const {id} = req.params;

    try{
        if(!id)
            return res.status(400).send("Id is missing");

        const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution');

        if(!getProblem)
            return res.status(404).send("Problem is missing");

        res.status(200).send(getProblem);

    }catch(err){

        res.status(500).send("Error: " + err);
    }
}

const getAllProblem = async (req,res) => {
    
   try{
        const searchQuery = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const filter = {
            title : { $regex: searchQuery, $options: "i"}
        }

        const problems = await Problem.find(filter)
        .skip(skip)
        .limit(limit)
        .select("_id title difficulty tags");

        const total = await Problem.countDocuments();

        res.json({
            problems,
            total,
            page,
            totalPages: Math.ceil(total/limit)
        });
    }catch(err){
        res.status(500).json({error : "Server error"});
    }
}

const solvedAllProblembyUser = async (req,res) => {
     
     try{
       const userId = req.result._id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

       
       const user = await User.findById(userId).populate({
        path: "problemSolved",
        select: "_id title difficulty tags"
       });

       console.log(user);

       if(!user){
        return res.status(404).json({message: 'User not found'});
       }

       const total = user.problemSolved.length;

       console.log(total);

       const paginatedProblems = user.problemSolved.slice(skip, skip + limit);

       res.json({
            paginatedProblems,
            total,
            page,
            totalPages: Math.ceil(total/limit)
        });
    }catch(err){
        res.status(500).send("Server Error");
    }
}

const submittedProblem = async (req,res) => {

   try{


    const userId = req.result._id;
    const problemId = req.params.pid;

    const ans = await Submission.find({userId,problemId});

    if(ans === null)
        return res.status(200).send("No submission made");
    res.status(200).send(ans);

   }catch(err){
       console.log("dld");
        res.status(500).send("Internal Server Error");
   }
}

module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem};

