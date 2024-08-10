// components/CategoryIcons.js
import { FaMobileAlt, FaLaptop, FaCamera, FaHeadphones, FaGamepad } from 'react-icons/fa';

const categories = [
  { name: 'Phones', icon: FaMobileAlt },
  { name: 'Computers', icon: FaLaptop },

  { name: 'Camera', icon: FaCamera },
  { name: 'HeadPhones', icon: FaHeadphones },
  { name: 'Gaming', icon: FaGamepad },
];

const Category = () => {
  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col items-center p-4  ">
          <category.icon className="text-2xl mb-2" />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Category
