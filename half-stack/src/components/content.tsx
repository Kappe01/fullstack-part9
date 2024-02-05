import Part from './Part';
import { CoursePart } from '../App';

interface CourseProps {
  courseParts: CoursePart[];
}

const Content = (props: CourseProps): JSX.Element => {
    return (
        <div>
          {props.courseParts.map((part, index) => (
            <Part key={index} part={part} />
          ))}
        </div>
    );
  };

export default Content;