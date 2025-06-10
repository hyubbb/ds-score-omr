import classNames from "classnames";
import Link from "next/link";

export interface ItabItems {
  label: string;
  link?: {
    pathname: string;
    slug?: string;
    querystring?: string[];
  };
}
export interface ITabGroup {
  tabItems: ItabItems[];
  current: number;
  setCurrent?: React.Dispatch<React.SetStateAction<number>>;
  tabBox?: React.ReactNode;
  onClick?: (item: number) => void;
}

export const TabGroup = ({
  tabItems,
  current,
  setCurrent,
  tabBox,
  onClick,
}: ITabGroup) => {
  return (
    <>
      <div className="flex">
        {tabItems?.map((item, tabIndex) => {
          const isActive = tabItems[current]?.label === item.label;
          const isFirst = tabIndex === 0;

          if (item.link) {
            const _querystring = item.link?.querystring?.reduce((acc, cur) => {
              return { ...acc, tab: [cur] };
            }, {});
            return (
              <Link
                key={item.label}
                href={{
                  pathname: item.link.slug
                    ? `${item.link.pathname}/${item.link.slug}`
                    : item.link.pathname,
                  query: { ..._querystring },
                }}
              >
                <div
                  className={classNames(
                    "border-t-[1px] border-r-[1px] border-grayDB  min-w-[10.375rem] h-[2.4375rem] w-fit text-base py-[0.4375rem] px-4 text-center font-bold ",
                    isActive
                      ? "text-black bg-white border-b-0 cursor-auto"
                      : "text-gray70 cursor-pointer",
                    isFirst && "first:border-l-[1px] first:border-grayDB"
                  )}
                  onClick={() => {
                    setCurrent && setCurrent(tabIndex);
                    onClick && onClick(tabIndex);
                  }}
                >
                  <div>{item.label}</div>
                </div>
              </Link>
            );
          }
          return (
            <div
              key={item.label}
              className={classNames(
                "border-t-[1px] border-r-[1px] border-grayDB  min-w-[10.375rem] w-fit h-[2.4375rem] text-base py-[0.4375rem] px-4 text-center font-bold",
                isActive
                  ? "text-black bg-white border-b-0 cursor-auto"
                  : "text-gray70 cursor-pointer",
                isFirst && "first:border-l-[1px] first:border-grayDB"
              )}
              onClick={() => {
                setCurrent && setCurrent(tabIndex);
                onClick && onClick(tabIndex);
              }}
            >
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>
      {/* 탭 하단에 추가할 경우 */}
      {tabBox && (
        <div className="mb-4 mt-[-1px] bg-white p-8 border-[1px] border-grayDB ">
          {tabBox}
        </div>
      )}
    </>
  );
};

export default TabGroup;
