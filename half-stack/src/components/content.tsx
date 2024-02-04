import Part from './Part';
import { CoursePart } from '../App';  // Adjust the path based on your project structure

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