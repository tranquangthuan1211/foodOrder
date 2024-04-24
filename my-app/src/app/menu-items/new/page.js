'use client';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { Categories } from "@/components/GetCatogories";
import urlFetch from "@/URl";
export default function NewMenuItemPage() {
  const categoriesList = Categories();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState('');
  const [
    extraIngredientPrices,
    setExtraIngredientPrices,
  ] = useState([]);

  async function onSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(urlFetch.MenuItem, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }
  if (loading) {
    return <h1>'Loading user info...'</h1>;
  }

  if (!data.admin) {
    return <h1>'Not an admin.'</h1>;
  }
  console.log(category)
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form
        onSubmit={ev =>
          onSubmit(ev, {
            image,name,description,basePrice,sizes,extraIngredientPrices,category
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
            <option >nhập lựa chọn</option>
              {categoriesList?.length > 0 && categoriesList.map(c => (
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
    </section>
  );
}