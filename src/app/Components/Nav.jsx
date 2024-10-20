"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Image from "next/image";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function nav() {
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: true },
    { name: "Collection", href: "/", current: false },
    { name: "Wardrobe", href: "/", current: false },
  ]);
  const handleClick = (clickedItem) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.name === clickedItem.name,
    }));
    setNavigation(updatedNavigation);
  };
  const { isLoged,setIsLoged } = useContext(UserContext);
  const [view, setView] = useState(false)
  const handleViewbar=()=>{
    (view)?setView(false):setView(true);
  }
  const handleOut=(e)=>{
    e.preventDefault();
    setIsLoged(false);
    setView(false)

  }
  return (
    <Disclosure as="nav" className=" pt-4 sticky top-0 bg-myBlack z-50 bg-my_light text-black ">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between ">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {
              isLoged ?
                <Image onClick={handleViewbar} src={'/svgs/account.svg'}  alt="account" width={35} height={35} className="cursor-pointer sm:hidden block z-20" /> : ''
            }
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black   focus:outline-none  focus:ring-none ">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-8 w-8 group-data-[open]:hidden "
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-8 w-8 group-data-[open]:block border-2 border-black"
              />
            </DisclosureButton>

          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start px-8 sm:px-0">
            <div className="flex flex-shrink-0 items-center sm:">
              <h1 className="uppercase text-black font-bold md:text-4xl text-base tx_lighter">
                Eleanor.
              </h1>
            </div>
            <div className="hidden  sm:block ml-auto mr-0">
              <div className="flex space-x-4 ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => handleClick(item)}
                    className={classNames(
                      item.current
                        ? " text-myGreen font-bold underline underline-offset-8"
                        : " text-black",
                      "block  px-3 py-2 text-2xl font-bold  "
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {
                  isLoged ?
                    <Image src={'/svgs/account.svg'} onClick={handleViewbar} alt="account" width={30} height={30} className="cursor-pointer" />
                    :
                    <Link href={'/Log'} className=" flex items-center justify-center px-6  text-2xl font-normal border border-black uppercase">login</Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden  absolute w-full bg-myBlack pl-6">
        <div className="space-y-1 px-2 pb-3 pt-2 bg-my_light text-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              onClick={() => handleClick(item)}
              className={classNames(
                item.current ? "text-black " : " text-black ",
                "block rounded-md px-3 py-2 text-md font-bold"
              )}
            >
              {item.name}
            </Link>
          ))}
          {
            isLoged ?
              ''
              :
              <Link href={'/Log'}  className="flex items-center justify-center px-4  text-md font-normal border border-black uppercase">login</Link>
          }
        </div>
      </DisclosurePanel>
      <div 
      className={`account-panal absolute top-[80px] transition-all  ${(view)?`right-0`:`-right-full`} h-[calc(100vh-80px)] w-[200px] bg-gradient-to-tr
       from-[#7d6241] to-[#dcb68c] rounded-tl-[30px] border-2 border-my_dark drp_sh p-4`}>
        <Image src={'/svgs/close.svg'} onClick={handleViewbar} alt="close" width={35} height={35} className="cursor-pointer"/>
        <div className="content flex flex-col items-start justify-center gap-5 mt-10 font-bold ">
          <div className="text-xl self-center">Hi fares !</div>
          <button className="bg-my_dark self-center text-white font-bold text-sm px-10 py-2 rounded-md uppercase my_shadow" onClick={handleOut}>log out</button>
        </div>
      </div>
    </Disclosure>
  );
}
