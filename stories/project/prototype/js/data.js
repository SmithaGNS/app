/**
 * DriveSafe Admin Portal — data layer & interfaces
 * Data captured from the live portal (drivesafe.ta.org.jm). In the prototype
 * these are in-memory; in production they come from the REST API.
 *
 * @typedef {Object} Violation
 * @property {number} id                 - serial number (S No)
 * @property {string} mobile             - reporter phone, E.164 display
 * @property {string} vehicleType        - e.g. "Taxi", "Truck"
 * @property {string} category           - violation category name
 * @property {string} otherDescription   - free text when category = Other
 * @property {string} location           - address / plus-code of the incident
 * @property {string} notes              - reporter notes
 * @property {string} registrationNo     - vehicle plate
 * @property {string} createdAt          - "YYYY-MM-DD HH:mm:ss"
 * @property {'Pending'|'Under review'|'Verified'|'Rejected'} status
 * @property {number} level              - severity 0–3 (PROPOSED)
 * @property {string} statusUpdatedBy    - portal user who last actioned it
 *
 * @typedef {Object} Category
 * @property {string} name
 * @property {string} description
 *
 * @typedef {Object} ContactMessage
 * @property {string} name
 * @property {string} email
 * @property {string} message
 * @property {string} createdAt
 * @property {string} response           - reply text ("" if unanswered)
 * @property {string} repliedAt          - timestamp of reply ("" if none)
 *
 * @typedef {Object} AdminUser
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {'Administrator'|'Violation manager'} role
 * @property {string} level              - "" | "1" | "2" | "3"
 *
 * @typedef {Object} AppUser
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {number} earnerPoints
 * @property {number} redeemedPoints
 */

/** @type {Violation[]} */
export const VIOLATIONS = [
  { id: 1, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Breaking One way/No Entry", otherDescription: "", location: "3XJV+5MF, Thudiyalur - Saravanampatti Rd, Saravanampatti, Coimbatore, Tamil Nadu 641035, India", notes: "", registrationNo: "", createdAt: "2026-09-08 05:45:32", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 2, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Using mobile phone while driving", otherDescription: "", location: "3XJV+5MF, Thudiyalur - Saravanampatti Rd, Saravanampatti, Coimbatore, Tamil Nadu 641035, India", notes: "", registrationNo: "", createdAt: "2026-09-01 07:18:44", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 3, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Wrong parking", otherDescription: "", location: "Test Location", notes: "test violation", registrationNo: "ABC123", createdAt: "2026-08-19 08:44:55", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 4, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Using mobile phone while driving", otherDescription: "", location: "jaamica", notes: "jgdititdi", registrationNo: "lhckyfuo", createdAt: "2026-08-19 06:45:31", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 5, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Using mobile phone while driving", otherDescription: "", location: "jaamica", notes: "jgdititdi", registrationNo: "lhckyfuo", createdAt: "2026-08-19 06:44:37", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 6, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Wrong parking", otherDescription: "", location: "jamaica", notes: "ufufuf", registrationNo: "puguog", createdAt: "2026-08-18 10:46:10", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 7, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Wrong parking", otherDescription: "", location: "jamaica", notes: "ufufuf", registrationNo: "puguog", createdAt: "2026-08-18 10:45:27", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 8, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Wrong parking", otherDescription: "", location: "jamaica", notes: "ufufuf", registrationNo: "puguog", createdAt: "2026-08-18 10:44:50", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 9, mobile: "+1 876 3125290", vehicleType: "Taxi", category: "Wrong parking", otherDescription: "", location: "9FQ5+M85, Pudupatti, Tamil Nadu 635654, India", notes: "dddf", registrationNo: "", createdAt: "2026-08-18 10:26:09", status: "Pending", level: 0, statusUpdatedBy: "-" },
  { id: 10, mobile: "+1 876 3125290", vehicleType: "Truck", category: "Breaking traffic signal", otherDescription: "", location: "Mani Nirmala 20, 60 C, 5th St, Sree Nagar, Bharathi Nagar, Peelamedu, Coimbatore", notes: "", registrationNo: "", createdAt: "2026-07-10 09:12:04", status: "Pending", level: 0, statusUpdatedBy: "-" },
];

/** Live portal reports the full violation count; the list shows page 1. */
export const VIOLATIONS_TOTAL = 23;

/**
 * @typedef {Object} Owner  - a category owner (e.g. an enforcement agency)
 * @property {string} owner
 * @property {string} description
 */

/** @type {Owner[]} */
export const OWNERS = [
  { owner: "Police", description: "Polices" },
];

/** @type {Category[]} — each may be assigned to an Owner */
export const CATEGORIES = [
  { name: "Over-charging fares", description: "Over-charging of fares", owner: "Police" },
  { name: "Over Crowding", description: "Over Crowding of Vehicles", owner: "" },
  { name: "Other", description: "Other incident/violation.", owner: "" },
  { name: "Stunt riding", description: "Doing stunts while driving which may lead to accident.", owner: "" },
  { name: "Breaking traffic signal", description: "Breaking traffic signal", owner: "" },
  { name: "Wrong parking", description: "Parked vehicle in wrong place/way.", owner: "" },
  { name: "Using mobile phone while driving", description: "Using mobile phone while driving", owner: "" },
  { name: "Breaking One way/No Entry", description: "Breaking One way/No Entry", owner: "" },
  { name: "Speeding", description: "Speeding", owner: "" },
  { name: "Improper Over taking", description: "Improper Over taking", owner: "" },
];

/** @type {ContactMessage[]} */
export const CONTACTS = [
  { name: "testing", email: "test@gmail.com", message: "scripthsjdjend", createdAt: "2026-08-21 12:01:28", response: "", repliedAt: "" },
  { name: "bestt", email: "test@gmail.com", message: "jgdgixgihockhch", createdAt: "2026-08-20 13:57:14", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhch", createdAt: "2026-08-20 13:57:08", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhch", createdAt: "2026-08-20 13:51:58", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhchoc", createdAt: "2026-08-20 13:50:10", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhchoc", createdAt: "2026-08-20 13:50:01", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhchoc", createdAt: "2026-08-20 13:49:55", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhchoc", createdAt: "2026-08-20 13:49:24", response: "", repliedAt: "" },
  { name: "test", email: "test@gmail.com", message: "jgdgixgihockhchoc", createdAt: "2026-08-20 13:49:18", response: "", repliedAt: "" },
  { name: "yicitc", email: "test@gmail.com", message: "gxugcigcigcgic", createdAt: "2026-08-20 13:45:15", response: "", repliedAt: "" },
];
export const CONTACTS_TOTAL = 24;

/** @type {AdminUser[]} */
export const ADMIN_USERS = [
  { firstName: "Ronald", lastName: "Stephen", email: "ronaldstephen@myambergroup.com", phone: "123456789", address: "Bangalore", role: "Administrator", level: "" },
  { firstName: "HANIF", lastName: "WALKER", email: "hanif.walker@ta.org.jm", phone: "18763831676", address: "119 MAXFIELD", role: "Administrator", level: "" },
  { firstName: "Shannay", lastName: "Ferguson", email: "shannay.ferguson@ta.org.jm", phone: "8769268912", address: "119 Maxfield Avenue, Kingston, Jamaica", role: "Administrator", level: "1" },
  { firstName: "Level2", lastName: "Admin", email: "@mail.com", phone: "6548724566", address: "Lichtenburg, South Africa", role: "Violation manager", level: "2" },
  { firstName: "Level1", lastName: "Admin", email: "level1@mail.com", phone: "98654874545", address: "1686 Big Moccasin Road, Nickelsville, VA 24271, USA", role: "Violation manager", level: "1" },
  { firstName: "Vernon", lastName: "Walters", email: "vernon.walters@ta.org.jm", phone: "777478947", address: "Jamaica Beach, TX, USA", role: "Administrator", level: "" },
  { firstName: "Sharlene", lastName: "Hamilton", email: "sharlene.hamilton@ta.org.jm", phone: "897478947", address: "Jakkalsrand Rd, Vereeniging, South Africa", role: "Administrator", level: "" },
  { firstName: "Petra-Kene", lastName: "Williams", email: "petrakene.williams@ta.org.jm", phone: "8974988947", address: "Midvaal Local Municipality, South Africa", role: "Administrator", level: "2" },
];

/** @type {AppUser[]} */
export const APP_USERS = [
  { firstName: "", lastName: "", email: "", phone: "1234567", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "4822979", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "8921990", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "7004346", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "2377075", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "4144702", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "2017359", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "3994758", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "2885580", earnerPoints: 0, redeemedPoints: 0 },
  { firstName: "", lastName: "", email: "", phone: "5434052", earnerPoints: 0, redeemedPoints: 0 },
];
export const APP_USERS_TOTAL = 3123;

export const STATUSES = ["Pending", "Under review", "Verified", "Rejected"];
