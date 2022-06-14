require("dotenv").config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getNote = async (req:any, res:any, next:any) => {
    const notesMail = req.query.email;
    console.log(notesMail, "data");

    if (notesMail !== undefined) {
        // By unique identifier
        const note = await prisma.notes.findUnique({
            where: {
                notesMail: notesMail,
            },
        })
        console.log(note)
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
    const {notesMail, body} = req.body
    console.log(notesMail,body, "data");
    if (notesMail !== undefined) {
        const updateNote = await prisma.notes.update({
            where: {
                notesMail: notesMail,
            },
            data: {
                body: body,
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
