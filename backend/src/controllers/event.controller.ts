import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { Event } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags, transform } from "typescript";
require("dotenv").config();

const date2 = new Date();
let dag = date2.getDate();
let maand = date2.getMonth() + 1;
let datum = dag + "-" + maand;
const datetest = new Date(datum);
console.log(date2);

const makeEvent = async (req: any, res: any) => {
  var { name, description, date, maxParticipants, type } = req.body;
  date = new Date(date);
  try {
    const newEvent = await prisma.event.create({
      data: {
        eventName: name,
        description: description,
        date: date,
        maxParticipants: maxParticipants,
        type: type,
      },
    });
    res.status(200).json({
      status: 200,
      result: "New event added",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong",
    });
  }
};

const getEvents = async (req: any, res: any) => {
  try {
    const eventList = await prisma.event.findUnique({
      where: {
        // date: datetest,
      },
      select: {
        eventName: true,
        date: true,
        maxParticipants: true,
        description: true,
        type: true,
        eventParticipants: true,
      },
    });
    res.status(200).json({
      status: 200,
      result: "gelukt",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong",
    });
  }
};

export { makeEvent, getEvents };
