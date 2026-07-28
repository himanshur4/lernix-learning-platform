import Course from "../models/course.js";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);
export const getAllCourses= async(req,res)=>{
    try {
        const cachedCourses = await redis.get("lernix:all_courses");

        if (cachedCourses) {
            return res.json({ 
                success: true, 
                courses: JSON.parse(cachedCourses) 
            });
        }

        const courses = await Course.find({
            isPublished: true
        }).select(['-courseContent', '-enrolledStudents']).populate({ path: 'educator' });

        await redis.set("lernix:all_courses", JSON.stringify(courses), "EX", 3600);

        res.json({ success: true, courses });
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export const getCourseId=async (req,res)=>{
    const {id}=req.params
    try{
        const courseData=await Course.findById(id).populate({path:'educator'})

        courseData.courseContent.forEach(chapter=>{
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl="";
                }
            })
        })
        res.json({success:true,courseData})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}



