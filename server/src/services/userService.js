const notifications = [
  {
    id: "1",
    type: "notice",
    title: "New Notice: Exam Schedule Released",
    message: "The end semester examination schedule has been released. Click to view.",
    timestamp: "2026-03-20T09:00:00Z",
    link: "/notices",
  },
  {
    id: "2",
    type: "event",
    title: "Event Registration Confirmed",
    message: "You are registered for Annual Tech Fest 2026 - TechZen.",
    timestamp: "2026-03-19T14:30:00Z",
    link: "/events",
  },
  {
    id: "3",
    type: "alert",
    title: "Scholarship Deadline Extended",
    message: "The scholarship application deadline has been extended to April 15th.",
    timestamp: "2026-03-15T10:00:00Z",
    link: "/notices",
  },
];

const getNotifications = () => notifications;

const addNotification = (data) => {
  const newNotif = {
    id: Date.now().toString(),
    type: data.type || "system",
    title: data.title || "Alert",
    message: data.message || "",
    timestamp: new Date().toISOString(),
    link: data.link || "/dashboard",
  };
  notifications.unshift(newNotif);
  return newNotif;
};

export { getNotifications, addNotification };
