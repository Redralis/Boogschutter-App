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
  let date = new Date();
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
    for (let u = 0; u < datelist.length; u++) {
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
  let eventList: any = [];
  let currentDate: any;

  if (typeof req.query.date !== "undefined") {
    const timestamp = parseInt(req.query.date);
    currentDate = new Date(timestamp);
  } else {
    currentDate = new Date();
  }

  currentDate.setHours(0, 0, 0, 0);

  let nextWeekDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 7
  );
  nextWeekDate.setHours(23, 59, 59, 999);

  let currentDateTimestamp = currentDate.getTime();
  let nextWeekDateTimestamp = nextWeekDate.getTime();

  try {
    eventList = await prisma.event.findMany({
      where: {
        datePicker: {
          gte: currentDateTimestamp,
          lte: nextWeekDateTimestamp,
        },
      },
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
    });
    res.status(200).json({
      status: 200,
      result: eventList,
      timestamp: currentDateTimestamp,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: "Something went wrong with the request",
    });
  }
};

const addEvents = async (req: any, res: any) => {
  const { eventName, date, tijd, description, type } = req.body;
  const maxParticipants = parseInt(req.body.maxParticipants);
  const dateString = `${date}T${tijd}:00Z`;
  const newDate = new Date(dateString);
  // console.log(date + "T" + tijd+ "Z");
  try {
    const addEvent = await prisma.event.create({
      data: {
        eventName: eventName,
        datePicker: newDate.getTime(),
        description: description,
        maxParticipants: maxParticipants,
        type: type,
      },
    });
    res.status(200).json({
      status: 200,
      result: addEvent,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: 400,
      result: "Something went wrong",
    });
  }
};

export { getEventsDay, getAllEvents, getWeekEvents, addEvents };
