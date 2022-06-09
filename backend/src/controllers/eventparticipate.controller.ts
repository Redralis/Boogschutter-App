import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

export const validateValidEventBody = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    const errorFieldParam = errors.array()[0].param;
    // store the first found error by the validator in a variable
    switch (errorFieldParam) {
      case "eventId":
        res.status(404).json({ status: 404, error: "Invalid event id, must be int" });
        break;
      case "userEmail":
        res.status(400).json({
          status: 400,
          error: "isAssistant is optional but must be boolean if passed",
        });
        break;
    }
    // switch case to determine the required error
  } else {
    next();
  }
}

export const participateEvent = async (req: any, res: any) => {
  try {
    const eventId = parseInt(req.params.eventid);
    const bodyData = req.body;

    if (typeof bodyData.isAssistent === "undefined") {
      bodyData.isAssistent = false;
    }
    const registration = await prisma.eventParticipants.create({
      data: {
        eventId,
        userEmail: bodyData.userEmail,
        isAssistent: bodyData.isAssistent,
      },
    });
    res.send(registration)
  } catch (err) {
    res.status(404).json({
      
      message : "hallo"
    })
  }
};
