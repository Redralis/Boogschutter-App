import { eventParticipants, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { Event } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags, transform, WatchDirectoryFlags } from "typescript";
require("dotenv").config();

const date = new Date();
const dag = date.getDate();
const maand = date.getMonth();
const jaar = date.getFullYear();
const datumNu = dag + "-" + (maand + 1) + "-" + jaar;

var events: {
  eventParticipants: eventParticipants[];
  eventName: string;
  date: Date;
  description: string;
  maxParticipants: number | null;
}[][] = [];

const getEventsDay = async (req: any, res: any) => {
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
      if (sDate.includes(datumNu)) {
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
          events.push(eventList);
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
      result: events,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong",
    });
  }
  events = [];
};

const getAllEvents = async (req: any, res: any) => {
  try {
    const allEvents = await prisma.event.findMany({
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
    res.status(200).json({
      status: 200,
      result: allEvents,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong",
    });
  }
};

//
const test = new Date();
const tdag = test.getDate();
const tmaand = test.getMonth();
const tjaar = test.getFullYear();
var diff = 0;
var maanddif = 0;
var jdiff = 0;
var tdatumNu =
  tdag + diff + "-" + (tmaand + 1 + maanddif) + "-" + (tjaar + jdiff);
console.log(tdatumNu);
//

const getWeekEvents = async (req: any, res: any) => {
  for (var u = 0; u < 7; u++) {
    diff++;
    console.log(tdatumNu);
    try {
      const weeklist = await prisma.event.findMany({
        select: {
          date: true,
        },
      });
      for (var u = 0; u < weeklist.length; u++) {
        let date = weeklist[u];
        let cDate = date.date;
        let sDate = cDate.toLocaleString();
        if (sDate.includes(tdatumNu)) {
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
            events.push(eventList);
            console.log("!");
          } catch (error) {
            res.status(400).json({
              status: 400,
              error: "Something went wrong",
            });
          }
        }
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: "Something went wrong",
      });
    }
  }
  res.status(200).json({
    status: 200,
    result: events,
  });
  events = [];
  diff = 0;
};

export { getEventsDay, getAllEvents, getWeekEvents };
