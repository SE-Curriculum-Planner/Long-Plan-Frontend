import React, { useEffect, useState } from 'react';
import CoreBox from 'common/components/SubjectBox/Core';
import MajorBox from 'common/components/SubjectBox/Major';
import ActBox from 'common/components/SubjectBox/Act';
import LearnerBox from 'common/components/SubjectBox/Learner';
import CoCreBox from 'common/components/SubjectBox/Cocre';
import ElecBox from 'common/components/SubjectBox/Elec';
import FreeBox from 'common/components/SubjectBox/Free';

const CurriculumBox: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/response_1706457320920.json'); // Update the path accordingly
        const data = await response.json();
        setCurriculumData(data.curriculum);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!curriculumData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div>
        <h6>Core - {curriculumData.coreAndMajorGroups[0].requiredCredits} credits |</h6>
        <CoreBox data={curriculumData.coreAndMajorGroups[0]} />
      </div>
      <div>
        <h6>Major required - {curriculumData.coreAndMajorGroups[1].requiredCredits} credits |</h6>
        <MajorBox data={curriculumData.coreAndMajorGroups[1]} />
      </div>
      <div>
        <h6>Major Elective - {curriculumData.coreAndMajorGroups[2].requiredCredits} credits |</h6>
      </div>
      <div>
        <h6>GE Learner - {curriculumData.geGroups[0].requiredCredits} credits |</h6>
        <LearnerBox data={curriculumData.geGroups[0]} />
      </div>
      <div>
        <h6>GE Co-cre - {curriculumData.geGroups[1].requiredCredits} credits |</h6>
        <CoCreBox data={curriculumData.geGroups[1]} />
      </div>
      <div>
        <h6>GE Act-citiz {curriculumData.geGroups[2].requiredCredits} credits |</h6>
        <ActBox data={curriculumData.geGroups[2]} />
      </div>
      <div>
        <h6>GE Elective {curriculumData.geGroups[3].requiredCredits} credits |</h6>
      </div>
      <div>
        <h6>Free Elective {curriculumData.freeElectiveCredits} credits</h6>
        
      </div>
    </div>
  );
};

export default CurriculumBox;
