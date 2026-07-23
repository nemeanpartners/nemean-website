import { WellPathJourneyStep } from '../types';

export const WELLPATH_JOURNEY_STEPS: WellPathJourneyStep[] = [
  {
    stepNumber: 1,
    title: "Identify a Goal",
    subtitle: "User selects personalized preventive health target",
    description: "The consumer selects or defines a personal health milestone (e.g. increasing daily movement, tobacco cessation, lifestyle nutrition, or stress management) without needing complex clinical terminology.",
    userAction: "Select goal category or enter custom health target",
    systemAction: "Categorizes intent into evidence-based preventive intervention tracks",
    barrierResolution: "Simplifies medical jargon into plain-English goal choices"
  },
  {
    stepNumber: 2,
    title: "Enter Location & Access Needs",
    subtitle: "Suburb, transport, cost & format preferences",
    description: "Captures postcode/suburb, preferred delivery mode (telehealth vs. local in-person clinic), zero-cost preferences, and mobility or schedule constraints.",
    userAction: "Enter QLD postcode (e.g., 4000, 4217, 4810) and availability filters",
    systemAction: "Queries verified Queensland preventive health directory database",
    barrierResolution: "Ensures only accessible programs within realistic reach are surfaced"
  },
  {
    stepNumber: 3,
    title: "Receive Explainable Matches",
    subtitle: "Transparent program matching with clear reasons",
    description: "Delivers a curated list of verified free or subsidised programs accompanied by plain-English explanations of why each program was matched.",
    userAction: "Review program options, costs, duration, and match rationales",
    systemAction: "Calculates match score based on goal fit, geographic proximity, and accessibility",
    barrierResolution: "Removes guesswork by highlighting eligibility and zero-out-of-pocket costs"
  },
  {
    stepNumber: 4,
    title: "Choose & Action a Referral",
    subtitle: "Self-referral or guided digital registration token",
    description: "Generates an instant referral action code or direct enrolment payload to connect the user directly with the program provider.",
    userAction: "Click 'Action Referral' to receive booking link or SMS registration token",
    systemAction: "Dispatches secure referral packet to verified program provider system",
    barrierResolution: "Eliminates drop-off between interest and official intake"
  },
  {
    stepNumber: 5,
    title: "Receive Follow-Up Support",
    subtitle: "Automated check-ins at 7, 14, and 30-day milestones",
    description: "Sends supportive, non-intrusive reminders and automated milestone check-ins via SMS or Web app notifications to keep participants engaged.",
    userAction: "Respond to quick 1-tap progress check-ins on mobile device",
    systemAction: "Tracks attendance and flags drop-out risk for intervention",
    barrierResolution: "Provides encouragement during critical early adoption weeks"
  },
  {
    stepNumber: 6,
    title: "Resolve Barriers or Access Navigator",
    subtitle: "Human & automated support when obstacles arise",
    description: "If a user faces a barrier (e.g. child care conflict, transport issues, or anxiety), WellPath routes them to a dedicated navigator or alternative option.",
    userAction: "Tap 'Report Barrier' to select transport, scheduling or cost obstacle",
    systemAction: "Re-routes to telehealth equivalent or triggers community navigator assist",
    barrierResolution: "Prevents total dropout when real-world challenges occur"
  },
  {
    stepNumber: 7,
    title: "Measure Enrolment & Participation",
    subtitle: "Closed-loop feedback for public health insights",
    description: "Captures verified enrolment and program completion status to provide anonymized operational data for health program planners and decision-makers.",
    userAction: "Complete brief completion confirmation upon finishing program modules",
    systemAction: "Aggregates outcome data into secure operational intelligence dashboards",
    barrierResolution: "Proves real community impact and closed-loop program effectiveness"
  }
];
