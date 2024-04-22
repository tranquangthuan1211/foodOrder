import { useState } from "react";

export default function MenuItem(props) {
  const [selectedSize, setSelectedSize] = useState(0);
  const[itemSize, setItemSize] = useState(0);
  const handleSizeSelection = (index, item) => {
    setSelectedSize(index);
    setItemSize(item.price)
  };
  return (
    <>
      {props.item ? (
        <div 
          className="bg-gray-300 p-4 rounded-lg text-center" 
          style={{overflow:'hidden'}}
        >
          <img src={props.item.image} alt="anh" className="max-h-auto max-h-24 block mx-auto"/>
          <h4 className="font-semibold text-xl my-2">{props.item.name}</h4>
          <p className="text-gray-500 text-sm">
            {props.item.description}
          </p>
            <div style={{height:"130px"}}>
              {props.item.sizes.map((i,index) => (
                <div key={index} 
                style={{display:'flex', 
                      alignItems:'center',
                      justifyContent:'space-between', 
                      border:"1px solid #fff",
                      backgroundColor: selectedSize === index ? '#fff' : 'transparent',
                      height:"30px"}}
                onClick={() => handleSizeSelection(index,i)} 
                      >
                  <p>size: {i.name}</p>
                  <p>price: {i.price}</p>
                </div>
              ))}
            </div>
          <button className="bg-primary text-white rounded-full px-6 py-2"
              onClick={() =>{ 
                props.item.price = itemSize;
                props.handleAdd(props.item)}}
          >
            Add to cart
          </button>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}
