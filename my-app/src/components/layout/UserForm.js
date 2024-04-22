'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import Alert from "@/components/alert"

export default function UserForm({user,onSave}) {
  const [userName, setUserName] = useState(user ? user.name : '');
  const [image, setImage] = useState(user? user.image : '');
  const [phone, setPhone] = useState(user? user.phone : '');
  const [streetAddress, setStreetAddress] = useState(user? user.streetAddress : '');
  const [postalCode, setPostalCode] = useState(user? user.postalCode : '');
  const [city, setCity] = useState(user? user.city : '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const loggedInUserData = user;

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }
  return (
    (user !== null ? (

    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          {user ? (
            <EditableImage id = {user.id} link={image} setLink={setImage} />
          ): (
            <h1>loading....</h1>
          )}
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, phone, admin,
            streetAddress, city, country, postalCode,
          })
        }
      >
        <label>
          First and last name
        </label>
        <input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user ? user.email : ''}
          placeholder={'email'}
        />
        <AddressInputs
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
    ): (
      <h1>loading...</h1>
    ))
  );
}