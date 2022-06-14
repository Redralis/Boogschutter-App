import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

export const validateValidEventBody = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorFieldParam = errors.array()[0].param;
    // store the first found error by the validator in a variable
    switch (errorFieldParam) {
      case "eventId":
        res.status(404).json({ status: 404, error: "Invalid event id, must be int" });
        break;
      case "email":
        res.status(400).json({
          status: 400,
          error: "email does not exist",
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

    const registration = await prisma.eventParticipants.create({
      data: {
        eventId,
        userEmail: bodyData.email,
      },
    });
    res.send(registration)
  } catch (err) {
    throw err
    // res.status(404).json({
    //   message : err
    // })
  }
};
