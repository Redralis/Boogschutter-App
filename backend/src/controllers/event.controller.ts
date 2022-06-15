import { eventParticipants, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { Event } from "@prisma/client";
import bcrypt from "bcrypt";
require("dotenv").config();

const getEventsDay = async (req: any, res: any) => {
  var date = new Date();
  const dateData = req.params.date;
  if (dateData != null) {
    const data = dateData.split("-");
    date = new Date(data[2], data[1] - 1, data[0]);
  }

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
      let nDate = sDate.split(" ");
      if (nDate[0] == datumNu) {
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

const getWeekEvents = async (req: any, res: any) => {
  var week = new Date();

  const dateData = req.params.date;
  if (dateData != null) {
    const data = dateData.split("-");
    week = new Date(data[2], data[1] - 1, data[0]);
  }

  var wdag = week.getDate();
  var wmaand = week.getMonth();
  var wjaar = week.getFullYear();
  var diff = 0;
  var maanddif = 0;
  var jdiff = 0;
  const dayCheck = week.toDateString();

  var eventsWeek: {
    eventParticipants: eventParticipants[];
    eventName: string;
    date: Date;
    description: string;
    maxParticipants: number | null;
  }[][] = [];

  function schrikkelJaar() {
    var round = Number.isInteger(wjaar / 4);
    if (round == true) {
      round = Number.isInteger(wjaar / 100);
      if (round == true) {
        round = Number.isInteger(wjaar / 400);
        if (round == true) {
          maanddif++;
          wdag = 1;
        }
      }
    } else if (wdag + diff > 28 && wmaand == 2) {
      maanddif++;
      wdag = 1;
      diff = 0;
    }
  }
  function evenMonth() {
    if (wdag + diff > 30) {
      if (wmaand == 3 || wmaand == 5 || wmaand == 8 || wmaand == 10) {
        maanddif++;
        wdag = 1;
        diff = 0;
      }
    }
  }
  function oddMonth() {
    if (wdag + diff > 31) {
      if (
        wmaand == 0 ||
        wmaand == 2 ||
        wmaand == 4 ||
        wmaand == 6 ||
        wmaand == 7 ||
        wmaand == 9
      ) {
        maanddif++;
        wdag = 1;
        diff = 0;
      }
    }
  }
  function newYear() {
    if (wmaand == 11 && wdag + diff > 31) {
      jdiff++;
      wmaand = 0;
      wdag = 1;
      diff = 0;
    }
  }
  function dayCorrecter() {
    if (dayCheck.includes("Tue")) {
      wdag -= 1;
    }
    if (dayCheck.includes("Wed")) {
      wdag -= 2;
    }
    if (dayCheck.includes("Thu")) {
      wdag -= 3;
    }
    if (dayCheck.includes("Fri")) {
      wdag -= 4;
    }
    if (dayCheck.includes("Sat")) {
      wdag -= 5;
    }
    if (dayCheck.includes("Sun")) {
      wdag -= 6;
    }
  }

  dayCorrecter();
  for (var i = 0; i < 7; i++) {
    var tdatumNu =
      wdag + diff + "-" + (wmaand + maanddif + 1) + "-" + (wjaar + jdiff);
    diff++;
    evenMonth();
    oddMonth();
    newYear();
    schrikkelJaar();
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
        let nDate = sDate.split(" ");

        if (nDate[0] == tdatumNu) {
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
            eventsWeek.push(eventList);
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
    result: eventsWeek,
  });
  eventsWeek = [];
  diff = 0;
  maanddif = 0;
  jdiff = 0;
  wdag = week.getDate();
  wmaand = week.getMonth();
  wjaar = week.getFullYear();
};

export { getEventsDay, getAllEvents, getWeekEvents };
