import { Icon } from "@/components/Commons/Icons/Icon";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface IMenuItems {
  label: string;
  href: {
    pathname: string;
    query: any;
  };
  child?: IMenuItems[];
}

export interface ITitle {
  menuItems: IMenuItems[];
}

const Title = ({ menuItems }: ITitle) => {
  const pathname = usePathname() ?? "/admin/dashboard/dashboard";
  const getCurrentMenu = (menu: IMenuItems[], pathname: string) => {
    let currentMenu = null;
    let depth1 = null;
    let depth2 = null;

    for (const menuItem of menu) {
      const regex = new RegExp(
        `^${menuItem.href.pathname.replace(/\[.*?\]/g, ".+")}$`,
      );

      if (regex.test(pathname)) {
        currentMenu = menuItem;
        depth1 = { label: menuItem.label, href: menuItem.href };

        if (menuItem.child) {
          let firstChild = menuItem.child[0];

          if (
            menuItem.label !== firstChild.label &&
            menuItem.href.pathname === firstChild.href.pathname
          ) {
            depth2 = { label: firstChild.label, href: firstChild.href };
          }
        }
        break;
      }

      if (menuItem.child) {
        for (const childMenu of menuItem.child) {
          const childRegex = new RegExp(
            `^${childMenu.href.pathname.replace(/\[.*?\]/g, ".+")}$`,
          );

          if (childRegex.test(pathname)) {
            currentMenu = menuItem;
            depth1 = { label: menuItem.label, href: menuItem.href };
            depth2 = { label: childMenu.label, href: childMenu.href };
            break;
          }

          if (childMenu.child) {
            for (const secondChildMenu of childMenu.child) {
              const childRegex = new RegExp(
                `^${secondChildMenu.href.pathname.replace(/\[.*?\]/g, ".+")}$`,
              );

              if (childRegex.test(pathname)) {
                currentMenu = childMenu;
                depth1 = { label: childMenu.label, href: childMenu.href };
                depth2 = {
                  label: secondChildMenu.label,
                  href: secondChildMenu.href,
                };
                break;
              }
            }
          }
        }
      }

      if (currentMenu) break;
    }

    return { depth1, depth2 };
  };

  const menu = getCurrentMenu(menuItems, pathname);

  return (
    <section className="flex items-end justify-between pb-5 pt-10">
      <span className={TextCommonConfig}>
        {menu.depth2?.label ? menu.depth2?.label : menu.depth1?.label}
      </span>
      <span className="flex flex-wrap items-center gap-x-1 text-xs">
        <Link href="/admin/dashboard/dashboard">홈</Link>
        <Icon title="arrow-next" />
        <Link
          href={{
            pathname: menu.depth1?.href?.pathname,
            query: menu.depth1?.href?.query,
          }}
        >
          {menu.depth1?.label}
        </Link>
        {menu.depth2?.label && <Icon title="arrow-next" />}
        <span>{menu.depth2?.label}</span>
      </span>
    </section>
  );
};

export default Title;

const TextCommonConfig = "text-2xl leading-9 font-bold";
