import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import Link from "next/link";

export default function CartProduct({product,onRemove,index}) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        {/* <Image width={240} height={240} src={product.image} alt={''} /> */}
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
          <div className="text-sm text-gray-500">
              <div key={product.name}>{product.name} ${product.price}</div>
          </div>
        
      </div>
        {/* <div className="ml-2">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2">
            <Trash />
          </button>
        </div> */}
    </div>
  );
}