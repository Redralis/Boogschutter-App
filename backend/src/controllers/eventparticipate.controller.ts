import { Prisma, PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

export const validateValidEventBody = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorFieldParam = errors.array()[0].param;
    // store the first found error by the validator in a variable
    switch (errorFieldParam) {
      case "eventid":
        res
          .status(400)
          .json({ status: 404, error: "Invalid event id, must be int" });
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
};

export const participateEvent = async (req: any, res: any) => {
  try {
    const eventId = parseInt(req.params.eventid);
    const bodyData = req.body;
    try {
      const registration = await prisma.eventParticipants.create({
        data: {
          eventId,
          userEmail: bodyData.email,
        },
      });
      res.send(registration);
    } catch(err) {
      res.status(400).json({
        status: 400,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (err.code === "P2002") {
        res.status(409).json({
          status: 409,
          message: "already enrolled for this event",
        });
      }
    } else {
      
      res.status(400).json({
        status: 400,
        message: err,
      });
    }
  }
};

export const checkIfAlreadyEnrolled = async (req: any, res: any) => {
  try {
    const { email, eventid } = req.body;
    const isEnrolled = await prisma.eventParticipants.count({
      where: {
        userEmail: email,
        eventId: eventid,
      },
    });

    if (isEnrolled) {
      res.status(200).json({
        status: 200,
        isEnrolled: true,
      });
    } else {
      res.status(200).json({
        status: 200,
        isEnrolled: false,
      });
    }
  } catch (err) {
    
    res.status(404).json({
      status: 404,
      message: "Something went wrong",
    });
  }
};
