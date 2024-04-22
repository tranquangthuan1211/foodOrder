'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-3 tabs justify-center flex-wrap">
      <Link
        className={path === '/profile' ? 'active' : ''}
        href={'/profile'}
      >
        Profile
      </Link>
      {isAdmin ? (
        <div>
          <Link
            style={{margin:'0 6px'}}
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            style={{margin:'0 6px'}}
            href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Menu Items
          </Link>
          <Link
            style={{margin:'0 6px'}}
            className={path.includes('/users') ? 'active' : ''}
            href={'/users'}
          >
            Users
          </Link>
        </div>
      ): null}
      <Link
        className={path === '/orders' ? 'active' : ''}
        href={'/orders'}
      >
        Orders
      </Link>
    </div>
  );
}