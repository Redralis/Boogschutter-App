import { eventParticipants, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { Event } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags, transform, WatchDirectoryFlags } from "typescript";
require("dotenv").config();

const date = new Date();
let dag = date.getDate() + 1;
let maand = date.getMonth() + 1;
let jaar = date.getFullYear();
let datum = jaar + "-" + maand + "-" + dag;
let datumNL = dag - 1 + "-" + maand + "-" + jaar;
const datetest = new Date(datum).toLocaleString();
console.log(date);
console.log(datetest);
console.log(datumNL);

const makeEvent = async (req: any, res: any) => {
  var { name, description, maxParticipants, type } = req.body;
  const date = new Date();
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

var qwert: {
  eventParticipants: eventParticipants[];
  eventName: string;
  date: Date;
  description: string;
  maxParticipants: number | null;
}[][] = [];
const getEvents = async (req: any, res: any) => {
  try {
    const datelist = await prisma.event.findMany({
      select: {
        date: true,
      },
    });
    for (var u = 0; u < datelist.length; u++) {
      let date = datelist[u];
      let cDate = date.date;
      let sDate = cDate.toLocaleString();
      if (sDate.includes(datumNL)) {
        try {
          const eventList = await prisma.event.findMany({
            where: {
              date: cDate,
            },
            select: {
              eventId: true,
              eventName: true,
              date: true,
              maxParticipants: true,
              description: true,
              type: true,
              eventParticipants: true,
            },
          });
          qwert.push(eventList);
        } catch (error) {
          res.status(400).json({
            status: 400,
            error: "Something went wrong",
          });
        }
      }
    }
    res.status(200).json({
      status: 200,
      result: qwert,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong",
    });
  }
  qwert = [];
};

export { makeEvent, getEvents };
