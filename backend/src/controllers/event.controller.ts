import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
require("dotenv").config();

const prismaQuery = {
  select: {
    eventId: true,
    eventName: true,
    datePicker: true,
    maxParticipants: true,
    description: true,
    type: true,
    eventParticipants: {
      select: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            
          },
        },
      },
    },
    _count: true,
  },
};

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

  let events = [];
  try {
    const datelist = await prisma.event.findMany({
      select: {
        datePicker: true,
      },
    });
    for (var u = 0; u < datelist.length; u++) {
      let date = datelist[u];
      let cDate = date.datePicker;
      let sDate = cDate.toLocaleString();
      let nDate = sDate.split(" ");
      if (nDate[0] == datumNu) {
        try {
          const eventList = await prisma.event.findMany(prismaQuery);
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
    const allEvents = await prisma.event.findMany(prismaQuery);
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
  let eventList: any
  
  var week = new Date();

  const dateData = req.params.date;
  if (dateData != null) {
    const data = dateData.split("/");
    week = new Date(data[2], data[1] - 1, data[0]);
  }

  var wdag = week.getDate();
  var wmaand = week.getMonth();
  var wjaar = week.getFullYear();
  var diff = 0;
  var maanddif = 0;
  var jdiff = 0;
  const dayCheck = week.getDay();

  let eventsWeek:any = [];
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
    if (dayCheck == 1) {
      wdag -= 1;
    }
    if (dayCheck == 2) {
      wdag -= 2;
    }
    if (dayCheck == 3) {
      wdag -= 3;
    }
    if (dayCheck == 4) {
      wdag -= 4;
    }
    if (dayCheck == 5) {
      wdag -= 5;
    }
    if (dayCheck == 6) {
      wdag -= 6;
    }
  }

  dayCorrecter();
  for (var i = 0; i < 7; i++) {
    var tdatumNu =
      wdag + diff + "/" +'0'+ (wmaand + maanddif + 1) + "/" + (wjaar + jdiff);
    diff++;
    evenMonth();
    oddMonth();
    newYear();
    schrikkelJaar();
    var ndatumNu = new Date(tdatumNu).getTime();
    try {
      const weeklist = await prisma.event.findMany({
        select: {
          datePicker: true,
        },
      });
      for (var u = 0; u < weeklist.length; u++) {
        let date = weeklist[u];
        let cDate = date.datePicker;
        let zDate = new Date(cDate);
        let sDate = zDate.toLocaleString();
        let nDate = sDate.split(", ");
        eventsWeek = [];
        console.log(eventList)
        if (nDate[0] == tdatumNu) {
          try {
             eventList = await prisma.event.findMany(prismaQuery);
            eventsWeek = eventList;
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
  // console.log(eventsWeek)
  res.status(200).json({
    status: 200,
    result: eventList,
  });
  
  console.log("a")
  diff = 0;
  maanddif = 0;
  jdiff = 0;
  wdag = week.getDate();
  wmaand = week.getMonth();
  wjaar = week.getFullYear();
};

const addEvents = async (req: any, res: any) => {
  const { eventName, date, tijd, description, maxParticipants, type } =
    req.body;
  const dateSplit = date.split("-");
  const maand = (dateSplit[1] -= 1);
  const tijdSplit = tijd.split(":");
  const newDate = new Date(
    dateSplit[2],
    maand,
    dateSplit[0],
    tijdSplit[0],
    tijdSplit[1],
    0,
    0
  ).getTime();

  try {
    const addEvent = await prisma.event.create({
      data: {
        eventName: eventName,
        datePicker: newDate,
        description: description,
        maxParticipants: maxParticipants,
        type: type,
      },
    });
    res.status(200).json({
      status: 200,
      result: "new event added",
    });
  } catch (error) {
    res.status(401).json({
      status: 401,
      result: "Something went wrong",
    });
  }
};

export { getEventsDay, getAllEvents, getWeekEvents, addEvents };
