import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import urlFetch from "@/URl";
import Alert from "../alert";

export default function MenuItemForm({menuItem}) {
  const [redirectToItems, setRedirectToItems] = useState(false)
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false)
  const [
    extraIngredientPrices,
    setExtraIngredientPrices,
  ] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    fetch(urlFetch.catogories)
    .then(res => res.json())
    .then(categories => {setCategories(categories)});
  }, []);
  const onSubmit = async (ev, data) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(urlFetch.MenuItem, {
        method: 'PUT',
        body: JSON.stringify({
          _id:menuItem._id,category , ...data
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await response.json()
      if (res.status === "success"){
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
          resolve()
      }
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: 'Error',
    }
  );

    setRedirectToItems(true);
  }
  if(menuItem === null) {
    return <h1>load data...</h1>
  }
  return (
    <div>
      {alert ? (
        <div style={{position:'absolute', right:'0',top:"35px"}}>
          <Alert/>
        </div>
      ): null}
      <form
        onSubmit={ev =>
          onSubmit(ev, {
            image,name,description,basePrice,sizes,extraIngredientPrices,
          })
        }
        className="mt-8 max-w-2xl mx-auto">
        <div
          className="md:grid items-start gap-4"
          style={{gridTemplateColumns:'.3fr .7fr'}}>
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
            <label>Category</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
              {categories?.length > 0 && categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={ev => setBasePrice(ev.target.value)}
            />
            <MenuItemPriceProps name={'Sizes'}
                                addLabel={'Add item size'}
                                props={sizes}
                                setProps={setSizes} />
            <MenuItemPriceProps name={'Extra ingredients'}
                                addLabel={'Add ingredients prices'}
                                props={extraIngredientPrices}
                                setProps={setExtraIngredientPrices}/>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}