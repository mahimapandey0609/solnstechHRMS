require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

var alert = require("alert");

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
secret: "Our Little secret.",
resave: false,
saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/solnstechDB", {useNewUrlParser : true});
const userSchema = {
    email: String,
    password : String
};



const User = new mongoose.model("User", userSchema);




const jobSchema = {
      jobId :Number,
      jobTitle :String,
      jobRecruiter : String,
      jobdate :Date,
      jobstatus: String,
      jobcity : String,
      jobdept: String,
      jobmanager : String
}
const Job = new mongoose.model("Job", jobSchema);

const candidateSchema ={   
    refer : String,
    candidateId: Number,
    candidateName:String,
    candidateEmail: String,
    candidateMobile: Number,
    currentjobtitle: String,
    currentemployer:String,
    relationship :String,
    knownperiod :String,
    subject:String
}
const Candidate = new mongoose.model("Candidate", candidateSchema);

const assessmentSchema = {
    assessmentName :String,
    noOfQuestions: Number,
    assessmentOwner: String,
    modifiedDate: Date
}

const Assessment = new mongoose.model("Assessment", assessmentSchema);

const interviewSchema ={
    interviewName: String,
    interviewFrom: Date,
    interviewTo:Date,
    interviewCandidateName : String,
    interviewDept: String,
    interviewTitle: String,
    interviewStatus : String,
    interviewOwner: String
}

const Interview = new mongoose.model("Interview", interviewSchema);

const taskSchema = {
     taskName: String,
     assignedTo :String,
     assignedDate : Date,
     dueDate : Date,
     taskStatus : String
}
const Task = new mongoose.model("Task", taskSchema);

const employeeSchema = {
    employeeName: String,
    employeeAdd : String,
    generatedDate :Date,
    employeeDesignation : String,
    employeeDept : String,
    employeetype : String,
    employeedoj : Date,
    employeeRole : String,
    employeeCTC : Number,
    employeeduedate :  Date

}

const Employee = new mongoose.model("Employee", employeeSchema);

const eventSchema = {
    eventName : String,
    eventDate : Date
}
const Event = new mongoose.model("Event", eventSchema);

const applicationSchema = {
    rating : Number,
    applicationName : String,
    hiringpipeline: String,
    applicationstatus: String,
    applicationid :Number,
    applicationposting : String
}

const Application = new mongoose.model("Application", applicationSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/index", function(req,res){
    
       Event.find({}, function(err, foundEvent){
        if(err){
            console.log(err);
        }else{
            if(foundEvent){
                res.render("index", {event:foundEvent});
            }
        }
    });
   
});

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
});

app.get("/job", function(req, res){
    Job.find({}, function(err, foundJob){
        if(err){
           console.log(err);
        }
        else{
           if(foundJob){
            res.render("job" , {UserWithJob : foundJob}); 
           }
        }
      });
    
});
app.get("/addjob", function(req, res){
    res.render("addjob");
});

app.get("/candidate", function(req,res){
    Candidate.find({}, function(err, foundCandidate){
        if(err){
            console.log(err);
        }
        else{
            if(foundCandidate){
                res.render("candidate" ,{candidate : foundCandidate} );
            }
        }
    });
  
});

app.get("/addcandidate", function(req, res){
    res.render("addcandidate");
});

app.get("/referrals", function(req,res){
    res.render("referrals");
});

app.get("/addreferrals", function(req,res){
    res.render("addrefferals");
});

app.get("/assessment", function(req,res){
   Assessment.find({}, function(err, foundAssessment){
     if(err){
        console.log(err);
     }else{
        if(foundAssessment){
            res.render("assessment", {assessment : foundAssessment});
            // console.log(foundAssessment);
        }
     }
   });

   
});
app.get("/addassessment", function(req,res){
    res.render("addassessment");
});

app.get("/todo",function(req,res){
    res.render("todo");
});
app.get("/interview", function(req,res){
    Interview.find({}, function(err, foundInterview){
        if(err){
            console.log(err);
        }else{
            if(foundInterview){
                res.render("interview", {interview: foundInterview});
            }
        }
    });
    
});

app.get("/addinterview", function(req, res){
    res.render("addinterview");
});

app.get("/calender", function(req,res){
    res.render("calender");
});

app.get("/task", function(req,res){
   Task.find({}, function(err, foundTask){
    if(err){
        console.log(err);
    }else{
        if(foundTask){
            res.render("task", {task:foundTask});
        }
    }
   });
   
});

app.get("/addtask", function(req,res){
   res.render("addtask");
});

app.get("/offerletter", function(req,res){
    res.render("offerletter");
 });

 app.get("/generatedoffer", function(req,res){
    // const name = req.body.employeeName;
    Employee.findOne({}).sort({_id : -1}).limit(10).exec(function(err, foundEmployee){
        // console.log(foundEmployee);
        if(err){
            console.log(err);
        }
        else
        {
            if(foundEmployee){
                // console.log(foundEmployee.employeeName);
                res.render("generatedoffer" , {employee:foundEmployee});
                }
    }
 });

    
});


app.get("/event", function(req,res){
    Event.find({}, function(err, foundEvent){
        if(err){
            console.log(err);
        }else{
            if(foundEvent){
                res.render("event", {event:foundEvent});
            }
        }
    });
    
});

app.get("/addevent", function(req,res){
    res.render("addevent");
});
app.get("/application", function(req,res){
    Application.find({}, function(err, foundApplication){
        if(err){
            console.log(err);
        }else{
            if(foundApplication){
                res.render("application", {application:foundApplication});
            }
        }
    });
});

app.get("/addapplication", function(req,res){
    res.render("addapplication");
});



app.get("/logout", function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
  });

  

app.post("/register", function(req, res){
    const newUser = new User({
        email : req.body.username,
        password : req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/index");
        }
    });
});

app.post("/login" , function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
           console.log(err);
        } else {
            if (foundUser) {
                    if (foundUser.password === password) {
                        res.redirect("/index");
                        alert("Thank You! Successfully Loggedin");
                          
                    }
                }
    }
});
});

app.post("/addjob", function(req,res){
  const newJob = new Job({
    jobId : req.body.jobId,
    jobTitle : req.body.jobTitle,
    jobRecruiter : req.body.jobRecruiter,
    jobdate :req.body.jobdate,
    jobstatus: req.body.jobstatus,
    jobcity : req.body.jobcity,
    jobdept: req.body.jobdept,
    jobmanager : req.body.jobmanager
  });
  newJob.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/job");
    }
  });
});

app.post("/addcandidate", function(req,res){

         const newCandidate = new Candidate({

       
        refer : req.body.refer,
        candidateId: req.body.candidateId,
        candidateName:req.body.candidateName,
        candidateEmail: req.body.candidateEmail,
        candidateMobile: req.body.candidateMobile,
        currentjobtitle: req.body.currentjobtitle,
        currentemployer:req.body.currentemployer,
        relationship :req.body.relationship,
        knownperiod :req.body.knownperiod,
        subject:req.body.subject
    });

    newCandidate.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/candidate");
        }
    });
});
app.post("/addreferrals", function(req,res){

    const newReferrals = new Candidate({
   
   refer : req.body.refer,
   candidateId: req.body.candidateId,
   candidateName:req.body.candidateName,
   candidateEmail: req.body.candidateEmail,
   candidateMobile: req.body.candidateMobile,
   currentjobtitle: req.body.currentjobtitle,
   currentemployer:req.body.currentemployer,
   relationship :req.body.relationship,
   knownperiod :req.body.knownperiod,
   subject:req.body.subject
});

newReferrals.save(function(err){
   if(err){
       console.log(err);
   }
   else{
       res.redirect("/candidate");
   }
});
});

app.post("/addassessment", function(req, res){
    const newAssessment = new Assessment({
        assessmentName :req.body.assessmentName,
        noOfQuestions: req.body.noOfQuestions,
        assessmentOwner: req.body.assessmentOwner,
        modifiedDate:req.body.modifiedDate
    });
    // console.log(modifiedDate);
    newAssessment.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/assessment");
        }
     });
});


app.post("/addinterview", function(req,res){
    const newInterview = new Interview({
        interviewName: req.body.interviewName,
        interviewFrom: req.body.interviewFrom,
        interviewTo: req.body.interviewTo,
        interviewCandidateName : req.body.interviewCandidateName,
        interviewDept: req.body.interviewDept,
        interviewTitle: req.body.interviewTitle,
        interviewStatus : req.body.interviewStatus,
        interviewOwner: req.body.interviewOwner
    });
    newInterview.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/interview");
        }
    });
});
  
  
app.post("/addtask", function(req,res){
    const newTask = new Task({
        taskName : req.body.taskName,
        assignedTo: req.body.assignedTo,
        assignedDate:req.body.assignedDate,
        dueDate:req.body.dueDate,
        taskStatus:req.body.taskStatus
    });
    newTask.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/task");
        }
    });
});


app.post("/delete", function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    Task.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/task");
        }
      });
})

app.post("/deletejob", function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    Job.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/job");
        }
      });
});
app.post("/deletecandidate", function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    Candidate.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/candidate");
        }
      });
});
app.post("/deleteassessment", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Assessment.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
        //   console.log("Record successfully deleted");
          res.redirect("/assessment");
        }
      });
});
app.post("/deleteinterview", function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    Interview.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/interview");
        }
      });
});
app.post("/deleteevent", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Event.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/event");
        }
      });
});

app.post("/deleteapplication", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Application.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/application");
        }
      });
});

app.post("/offerletter", function(req, res){
    const newEmployee = new Employee({
        employeeName : req.body.employeeName,
        employeeAdd: req.body.employeeAdd,
        generatedDate :req.body.generatedDate,
        employeeDesignation : req.body.employeeDesignation,
        employeeDept :req.body.employeeDept,
        employeetype:req.body.employeetype,
        employeedoj :req.body.employeedoj,
        employeeRole:req.body.employeeRole,
      employeeCTC :req.body.employeeCTC,
      employeeduedate :req.body.employeeduedate
    });
    newEmployee.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/generatedoffer");
        }
    });
});

app.post("/addevent", function(req,res){
  const newEvent = new Event({
    eventName : req.body.eventName,
    eventDate :req.body.eventDate
  });
  newEvent.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/event");
    }
  });

});

app.post("/addapplication", function(req,res){
    const newApplication = new Application({
        rating: req.body.rating,
        applicationName : req.body.applicationName,
    hiringpipeline:req.body.hiringpipeline,
    applicationstatus: req.body.applicationstatus,
    applicationid : req.body.applicationid,
    applicationposting : req.body.applicationposting
    });
    newApplication.save(function(err){
        if(err){
           console.log(err);
        }else{
            res.redirect("/application");
        }
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
})