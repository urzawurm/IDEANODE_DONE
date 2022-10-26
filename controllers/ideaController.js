import Idea from "../models/Idea.js";

export const getIdeas=(req,res)=>{
    Idea.find({user: res.locals.user._id})  //呢個寫法好!!basic 個session個ID link 返個 mongoDB _ID,一定唔會link錯。
    .lean()
    .sort({ date: "desc" })
    .then((ideas)=>{
        res.render("ideas/index", { ideas: ideas}); //models/idea.js, in mongoDB db.ideas.find()
    });
};

//come back later, add the/ideas function
export const postAddIdea=(req,res)=>{//有啲render未寫可改send 試條path work唔work,post係有野add入去
    let errors =[];
//push error message if empty input
    if (!req.body.title){
        errors.push({text: "please add a title"});
    }
    if(!req.body.details){
        errors.push({text: "please add some feedback"});
    }
    //if there are errors, render the page with error message
    if(errors.length>0){
        res.render("ideas/add",{ //user frendly 入漏左其中一個會通知邊個位置。
            errors: errors,
            title: req.body.title,
            details: req.body.details,
        });
    }else{
        const newUser ={ //入 data save入 mongoDB
            title: req.body.title,
            details: req.body.details,
            user: res.locals.user._id,
        };
        new Idea(newUser).save().then((idea)=>{//save in data base 
            req.flash("success_msg","Added Feedback!"); //出success added的msg 通知
            res.redirect("/ideas"); //redirect 上一版
        });
    }
};
// add note add routes
//idea form
export const getAddIdea = (req,res)=>{
    res.render("ideas/add");
};
export const getEditIdea=(req,res)=>{
    Idea.findOne({_id: req.params.id})
    .lean()
    .then((idea)=>{
        res.render("ideas/edit",{idea:idea});
    });
};
export const putEditIdea=(req,res)=>{ //user update
    Idea.findOne({_id:req.params.id}).then((idea)=>{
        idea.title=req.body.title;
        idea.details=req.body.details;
        idea.save().then(()=>{
            req.flash("success_msg","Feedback Update !"); //出success update的msg 通知
            res.redirect("/ideas");
        });
        idea.date=req.body.date;
    });
};
export const deleteIdea=(req,res)=>{
    Idea.deleteOne({_id: req.params.id})
        .then(()=>{
            req.flash("error_msg","Feedback Deleted !"); //出deleted唔到的msg 通知
            res.redirect("/ideas")
        });
};


