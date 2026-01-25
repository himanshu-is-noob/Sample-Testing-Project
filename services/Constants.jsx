import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, MessagesSquare, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";
import { Crown } from 'lucide-react';

export const SidebarOptions = [
    {
        name : 'Dashboard',
        icon:LayoutDashboard , 
        path:'/dashboard'
    },
    {
        name : 'Scheduled Interview',
        icon:Calendar , 
        path:'/scheduled-interview'
    },
    {
        name : 'All Interview',
        icon:List , 
        path:'/all-interview'
    },
    {
       name : 'Experiences' ,
        icon : MessagesSquare,
        path : '/dashboard/experiences'
    },
    {
        name : 'Billing',
        icon:WalletCards , 
        path:'/billing'
    },
    {
        name : 'Settings',
        icon:Settings , 
        path:'/settings'
    }
    
]

export const InterviewType = [
    {
        title : 'Technical' ,
        icon : Code2Icon
    },
    {
        title : 'Behavioral' ,
        icon : User2Icon
    },
    {
        title : 'Experience' ,
        icon : BriefcaseBusinessIcon
    },
    {
        title : 'Problem Solving' ,
        icon : Puzzle 
    },
    {
        title : 'Leadership' , 
        icon : Crown
    }
]


export const Question_Prompt = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}
Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Start like real interview like name etc. Make sure its like real interview as we are going to hire people through this .
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
question:'',
type:'Technical/Behavioral/Experince/Problem Solving/Leadership'
},{
...
}]
The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`


export const FEEDBACK_PROMPT = `{{conversation}}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user interview. Give me honest rating out of 10 for technical Skills, Communication, Problem Solving, Experince from Recuiter POV. Also give me summary in 3 lines about the interview and one line to let me know whether is recommended for hire or not with msg. Give me response strictly in JSON format. Example is as follows
{
    feedback:{
        rating:{
            techicalSkills:5,
            communication:6,
            problem Solving:4,
            experince:7,
        },  
        summary:<in 3 Line>,
        Recommendation:'',
        RecommendationMsg:''
    }
}
Do not include any extra explanations, markdown, signs, or code fences — return only valid JSON.    
`
