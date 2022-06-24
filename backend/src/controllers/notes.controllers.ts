require("dotenv").config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getNote = async (req:any, res:any, next:any) => {
    const notesMail = req.query.email;
    

    if (notesMail !== undefined) {
        // By unique identifier
        const note = await prisma.notes.findUnique({
            where: {
                notesMail: notesMail,
            },
        })
        
        if (note !== null) {
            res.status(200).json({
                result: note
            })
        }else {
            res.status(400).json({
                response: "User NOT found."
            })
        }
    }
}

const saveNote = async (req:any, res:any, next:any) => {
    const {textarea, getLoggedMail} = req.body.data
    
    
    

    if (getLoggedMail !== undefined) {
        const updateNote = await prisma.notes.update({
            where: {
                notesMail: getLoggedMail,
            },
            data: {
                notesMail: getLoggedMail,
                body: textarea
            },
        })
        res.status(200).json({
            result: updateNote
        })
    } else {
        res.status(400).json({
            response: "User NOT found."
        })
    }
    


}

export { getNote, saveNote };
