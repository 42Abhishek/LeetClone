
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({

    userId : {
        type :Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    problemId : {
        type :Schema.Types.ObjectId,
        ref : 'Problem',
        required : true
    },
    code: {
        type :String,
        require :true
    },
    language : {
        type :String,
        require :true,
        enum : ['javascript','c++','java']
    },

    status : {
        type : String,
        endum: ['pending','accepted','wrong','error'],
        default : 'pending'
    },
    runtime : {
        type : Number,
        default : 0
    },
    memory: {
        type :Number,
        default : 0
    },
    errorMessage: {
        type : String,
        default : ''
    },

    testCasesPassed : {
        type :Number,
        default : 0
    },

    testCasesTotal : {
        type: Number,
        default : 0
    }
},{
    timestamps :true
})

submissionSchema.index({userId:1, problemId: 1});

const Submission = mongoose.model('submission',submissionSchema);

module.exports = Submission;

