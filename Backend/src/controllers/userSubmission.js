
const Problem = require("../models/problems");
const Submission = require("../models/submission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const submitCode = async (req,res) => {

  try{
    const userId = req.result._id;
   
    const problemId = req.params.id;

    const {language,code} = req.body;

    // console.log(userId,problemId,language,code);

    if(!userId || !problemId || !code || !language){
        return res.status(400).send("Some field missing");
    }

    if(language === 'cpp')
      language = 'c++';

    const problem = await Problem.findById(problemId);

    const submitedResult = await Submission.create({
       userId,
       problemId,
       code,
       language,
       testCasePassed:0,
       status:"pending",
       testCasesTotal: problem.hiddenTestCases.length
    })

    const languageId = getLanguageById(language);

    const submissions = problem.hiddenTestCases.map((testCase) => ({
        source_code: code,
        language_id : languageId,
        stdin : testCase.input,
        expected_output : testCase.output
    }))

    const submitResult = await submitBatch(submissions);

    const resultToken = submitResult.map((value) => value.token);



    const testResult = await submitToken(resultToken);

    //update submit result in db

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "accepted";
    let errorMessage = "";

    for(const test of testResult){
        if(test.status.id == 3){
           testCasesPassed++;
           runtime = runtime + parseFloat(test.time);
           memory = Math.max(memory,parseFloat(test.memory)); 
        }else{
            if(test.status.id == 4){
               status = 'error';
               errorMessage = test.stderr;
            }else{
                status = 'wrong';
                errorMessage = test.stderr;
            }
           
        }
    }

    submitedResult.status = status;
    submitedResult.testCasesPassed = testCasesPassed;
    submitedResult.errorMessage = errorMessage;
    submitedResult.runtime = runtime;
    submitedResult.memory = memory;

  
    await submitedResult.save();

    //problemId ko insert karenge userSchma ke problemSolved mein if it isw not present there

    if(!req.result.problemSolved.includes(problemId)){
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    const accepted = (status === 'accepted');

    res.status(201).json({
      accepted,
      totalTestCases: submitedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory
    });


  }catch(err){
    res.status(500).send("Internal Server Error " + err);
  }
}

const runCode = async (req,res) =>{

  try{
    const userId = req.result._id;
   
    const problemId = req.params.id;

    // console.log(req.body);

    const {language,code} = req.body;

    // console.log(userId,problemId,language,code);

    if(!userId || !problemId || !code || !language){
        return res.status(400).send("Some field missing");
    }

    const problem = await Problem.findById(problemId);

    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testCase) => ({
        source_code: code,
        language_id : languageId,
        stdin : testCase.input,
        expected_output : testCase.output
    }))

    const submitResult = await submitBatch(submissions);

    const resultToken = submitResult.map((value) => value.token);

    const testResult = await submitToken(resultToken);

    // let testCasesPassed = 0;
    // let runtime = 0;
    // let memory = 0;
    // let status = true;
    // let errorMessage = null;

    // for(const test of testResult){
    //   if(test.status._id === 3){
    //     testCasesPassed++;
    //     runtime = runtime + parseFloat(test.time);
    //     memory = Math.max(memory, test.memory);
    //   }else{
    //     if(test.status._id === 4){
    //       status = false;
    //       errorMessage = test.stderr;
    //     }else{
    //       status = false;
    //       errorMessage = test.stderr;
    //     }
    //   }
    // }

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }


    console.log(success , testResult);

    res.status(201).json({
      success: status,
      testCases: testResult,
      runtime,
      memory
    });

  }catch(err){
    res.status(500).send("Internal Server Error " + err);
  }

}

module.exports = {submitCode,runCode};