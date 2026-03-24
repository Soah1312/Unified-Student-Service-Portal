let notices = [
  {
    id: 1,
    title: "End Semester Examination Schedule Released",
    category: "Academic",
    priority: "high",
    content:
      "The end semester examination schedule for the current academic term has been officially released. Students are advised to check the timetable carefully and plan their preparation accordingly. Any clashes must be reported to the Academic Office within 3 days.",
    date: "2026-03-20",
    author: "Academic Office",
    comments: [
      {
        id: 1,
        user: "Aryan Mehta",
        avatar: "AM",
        text: "Will the schedule be updated for re-exam students?",
        timestamp: "2026-03-20T10:30:00Z",
      },
      {
        id: 2,
        user: "Priya Sharma",
        avatar: "PS",
        text: "Has the practical exam dates been included?",
        timestamp: "2026-03-20T11:15:00Z",
      },
    ],
  },
  {
    id: 2,
    title: "Library Timing Extended During Exam Season",
    category: "Facilities",
    priority: "medium",
    content:
      "The Central Library will remain open until 11 PM on all weekdays and 8 PM on weekends starting from April 1st until the end of examination period. Students are encouraged to make use of this facility.",
    date: "2026-03-18",
    author: "Library Administration",
    comments: [],
  },
  {
    id: 3,
    title: "Scholarship Application Deadline Extended",
    category: "Finance",
    priority: "high",
    content:
      "The deadline for the Merit Scholarship and Need-Based Financial Aid applications has been extended to April 15th, 2026. Students who missed the original deadline are encouraged to apply. All applications must be submitted online through the Student Portal.",
    date: "2026-03-15",
    author: "Finance Department",
    comments: [
      {
        id: 1,
        user: "Rohan Das",
        avatar: "RD",
        text: "Is the income certificate still required?",
        timestamp: "2026-03-15T09:00:00Z",
      },
    ],
  },
  {
    id: 4,
    title: "Campus Wi-Fi Maintenance - April 2nd",
    category: "Infrastructure",
    priority: "low",
    content:
      "Scheduled maintenance on the campus-wide Wi-Fi network will take place on April 2nd from 2 AM to 6 AM. During this window, internet services will be unavailable. We apologize for any inconvenience.",
    date: "2026-03-14",
    author: "IT Department",
    comments: [],
  },
  {
    id: 5,
    title: "Anti-Ragging Policy Reminder",
    category: "Administration",
    priority: "medium",
    content:
      "A reminder to all students regarding the zero-tolerance anti-ragging policy of the institution. Any complaints can be reported to the Anti-Ragging Committee or via the anonymous helpline 1800-XXX-XXXX. The college takes all complaints seriously.",
    date: "2026-03-10",
    author: "Student Affairs",
    comments: [],
  },
];

let nextCommentId = 10;

const getAllNotices = () => notices;

const getNoticeById = (id) => notices.find((n) => n.id === parseInt(id));

const addComment = (noticeId, { user, text }) => {
  const notice = getNoticeById(noticeId);
  if (!notice) return null;
  const comment = {
    id: nextCommentId++,
    user: user || "Anonymous",
    avatar: (user || "A").substring(0, 2).toUpperCase(),
    text,
    timestamp: new Date().toISOString(),
  };
  notice.comments.push(comment);
  return comment;
};

let nextNoticeId = 6;

const createNotice = (data) => {
  const newNotice = {
    id: nextNoticeId++,
    title: data.title || "Untitled",
    category: data.category || "General",
    priority: data.priority || "medium",
    content: data.content || "",
    date: new Date().toISOString().split('T')[0],
    author: data.author || "Admin",
    comments: [],
  };
  notices.unshift(newNotice); // Add to beginning
  return newNotice;
};

const updateNotice = (id, data) => {
  const noticeIndex = notices.findIndex((n) => n.id === parseInt(id));
  if (noticeIndex === -1) return null;
  
  notices[noticeIndex] = {
    ...notices[noticeIndex],
    ...data,
    id: parseInt(id) // Ensure ID doesn't change
  };
  return notices[noticeIndex];
};

const deleteNotice = (id) => {
  const noticeIndex = notices.findIndex((n) => n.id === parseInt(id));
  if (noticeIndex === -1) return false;
  
  notices.splice(noticeIndex, 1);
  return true;
};

export { getAllNotices, getNoticeById, addComment, createNotice, updateNotice, deleteNotice };
