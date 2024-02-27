import { MarkerType } from "reactflow";
import CoreNode from "../nodes/CoreNode";
import MajorReqNode from "../nodes/MajorReqNode";
import MajorElecNode from "../nodes/MajorElecNode";
import CoCreNode from "../nodes/CoCreNode";
import ActNode from "../nodes/ActNode";
import LearnerNode from "../nodes/LearnerNode";
import SemesterLine from "../nodes/SemesterLine";
import HeaderText from "../nodes/HeaderText";
import FreeNode from "../nodes/FreeNode";
import ElecNode from "../nodes/ElecNode";

export const nodeTypes: any = {
  Core: CoreNode,
  MajorReq: MajorReqNode,
  MajorElec: MajorElecNode,
  CoCre: CoCreNode,
  Act: ActNode,
  Learner: LearnerNode,
  Free: FreeNode,
  Elec: ElecNode,
  Line: SemesterLine,
  Header: HeaderText,
};

export const initialNodes: any = [
  { id: "HeaderText", type: "Header", position: { x: 0, y: -80 } },
  { id: "semester-line1", type: "Line", position: { x: 160, y: -50 } },
  { id: "semester-line2", type: "Line", position: { x: 360, y: -50 } },
  { id: "semester-line3", type: "Line", position: { x: 560, y: -50 } },
  { id: "semester-line4", type: "Line", position: { x: 760, y: -50 } },
  { id: "semester-line5", type: "Line", position: { x: 960, y: -50 } },
  { id: "semester-line6", type: "Line", position: { x: 1160, y: -50 } },
  { id: "semester-line7", type: "Line", position: { x: 1360, y: -50 } },
  {
    id: "core1",
    sourcePosition: "right",
    type: "Core",
    data: {
      courseNo: "206161",
      courseTitleEng: "Calculus 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "core2",
    type: "Core",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      courseNo: "206162",
      courseTitleEng: "Calculus 2",
      totalCredit: 3,
    },
    position: { x: 200, y: 0 },
  },
  {
    id: "core3",
    type: "Core",
    data: {
      courseNo: "206261",
      courseTitleEng: "Calculus 3",
      totalCredit: 3,
    },
    position: { x: 400, y: 0 },
  },
  {
    id: "core4",
    type: "Core",
    data: {
      courseNo: "261208",
      courseTitleEng: "Numerical",
      totalCredit: 3,
    },
    position: { x: 600, y: 0 },
  },
  {
    id: "core5",
    type: "Core",
    data: {
      courseNo: "261306",
      courseTitleEng: "Prob & Stats",
      totalCredit: 3,
    },
    position: { x: 1000, y: 0 },
  },
  {
    id: "core6",
    type: "Core",
    data: {
      courseNo: "261216",
      courseTitleEng: "Discrete Math",
      totalCredit: 3,
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "act1",
    type: "Act",
    data: {
      courseNo: "259191",
      courseTitleEng: "Activities 1",
      totalCredit: 3,
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "act2",
    type: "Act",
    data: {
      courseNo: "259106",
      courseTitleEng: "Workshop",
      totalCredit: 3,
    },
    position: { x: 0, y: 200 },
  },
  {
    id: "act3",
    type: "Act",
    data: {
      courseNo: "259192",
      courseTitleEng: "Activities 2",
      totalCredit: 3,
    },
    position: { x: 1400, y: 100 },
  },
  {
    id: "mreq1",
    type: "MajorReq",
    data: {
      courseNo: "261103",
      courseTitleEng: "Basic CPE",
      totalCredit: 3,
    },
    position: { x: 0, y: 400 },
  },
  {
    id: "mreq2",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 400, y: 400 },
  },
  // init end here
  {
    id: "mreq3",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 200, y: 300 },
  },
  {
    id: "mreq4",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 600, y: 400 },
  },
  {
    id: "mreq7",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 400, y: 200 },
  },
  {
    id: "mreq8",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 600, y: 300 },
  },
  {
    id: "mreq9",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1000, y: 300 },
  },
  {
    id: "mreq10",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1400, y: 300 },
  },
  {
    id: "mreq11",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 600, y: 100 },
  },
  {
    id: "mreq12",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 800, y: 100 },
  },
  {
    id: "mreq13",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 800, y: 200 },
  },
  {
    id: "mreq14",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1200, y: 200 },
  },
  {
    id: "mreq15",
    type: "MajorReq",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1400, y: 200 },
  },
  {
    id: "melec1",
    type: "MajorElec",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1400, y: 400 },
  },
  {
    id: "melec2",
    type: "MajorElec",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1200, y: 400 },
  },
  {
    id: "melec3",
    type: "MajorElec",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 1000, y: 400 },
  },
  {
    id: "melec4",
    type: "MajorElec",
    data: {
      courseNo: "261207",
      courseTitleEng: "CPE Lab",
      totalCredit: 3,
    },
    position: { x: 800, y: 400 },
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "core-1",
    type: "smoothstep",
    target: "horizontal-3",
  },
];

export const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};
