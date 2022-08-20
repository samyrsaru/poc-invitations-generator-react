import { SyntheticEvent, useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { MdTitle } from "react-icons/md";
import { GiAmpleDress } from "react-icons/gi";
import { IInvitation } from "../IInvitation";

export const InvitationGenerator = (props: {
    close: (save?: boolean) => void,
    addInvitation: (invitation: IInvitation) => void,
    invitation?: IInvitation | null
}) => {
    const [isCustomColor, setIsCustomColor] = useState(props.invitation?.isCustomColor);
    const onClose = () => {
        props.close();
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const {
            name,
            description,
            date,
            location,
            dressColorCode,
            customColor
        } = e.target.elements;
        
        let invitation: IInvitation | undefined | null = props.invitation;
        if (invitation) {
            invitation.name = name.value;
            invitation.description = description.value;
            invitation.eventDate = new Date(date.value);
            invitation.location = location.value;
            invitation.dressColorCode = isCustomColor ? customColor.value : dressColorCode.value;
            invitation.isCustomColor = isCustomColor;
            props.close(true);
        } else {
            invitation = {
                id: new Date().getUTCMilliseconds(),
                name: name.value,
                description: description.value,
                eventDate: new Date(date.value),
                location: location.value,
                dressColorCode: isCustomColor ? customColor.value : dressColorCode.value,
                isCustomColor: isCustomColor
            }
            console.log("saved invitation:", invitation);
            props.addInvitation(invitation);
        }
    }

    const handleDressColorChange = (e: any) => {
        setIsCustomColor(e.target.value === "custom");
    }

    const prepareDate = () => {
        let d: Date;
        if (props.invitation) {
            d = props.invitation.eventDate;
        } else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }

        const utcString = d.toISOString().substring(0, 19);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const localDatetime = year + "-" +
            (month < 10 ? "0" + month.toString() : month) + "-" +
            (day < 10 ? "0" + day.toString() : day) + "T" +
            (hour < 10 ? "0" + hour.toString() : hour) + ":" +
            (minute < 10 ? "0" + minute.toString() : minute) +
            utcString.substring(16, 19);
        return  localDatetime;
    }

    const date = prepareDate();

    return (
        <form
            id="form"
            className="bg-gray-50 text-gray-900 flex flex-col my-2 p-4 gap-2 w-full"
            onSubmit={handleSubmit}
        >
            <label className="flex items-center gap-2"><MdTitle />Event name:</label>
            <input
                id="name"
                className="bg-gray-200 text-gray-700 focus:bg-white border-2 py-3 px-4 leading-tight"
                defaultValue={props.invitation?.name}
            />
            <label className="flex items-center gap-2"><CgDetailsMore/>Description:</label>
            <textarea
                id="description"
                defaultValue={props.invitation?.description}
                className="bg-gray-200 text-gray-700 focus:bg-white border-2 py-3 px-4 leading-tight" 
                rows={5}
            ></textarea>
            <label className="flex items-center gap-2"><AiOutlineFieldTime />When?</label>
            {/* <input type="datetime-local" defaultValue={new Date().toISOString().substring(0, 10)} ></input> */}
            <input
                id="date"
                type="datetime-local"
                defaultValue={date.toLocaleString()}
                className="bg-gray-200 text-gray-700 focus:bg-white border-2 py-3 px-4 leading-tight"
            ></input>

            <label className="flex items-center gap-2"><GoLocation />Where?</label>
            <div className="flex justify-end">
                <input
                    id="location"
                    defaultValue={props.invitation?.location}
                    className="bg-gray-200 text-gray-700 focus:bg-white border-2 py-3 px-4 leading-tight w-full"/>
            </div>

            <label className="flex items-center gap-2"><GiAmpleDress />Dress color code:</label>
            <select
                onChange={handleDressColorChange}
                id="dressColorCode"
                defaultValue={!props.invitation?.isCustomColor ? props.invitation?.dressColorCode : "custom"}
                className="bg-gray-200 text-gray-700 focus:bg-white border-2 py-3 px-4 leading-tight w-full">
                <option className="">none</option>
                <option className="w-20">red</option>
                <option className="w-20">black</option>
                <option className="w-20">white</option>
                <option className="w-20">custom</option>
            </select>
            {isCustomColor && <label>Select custom color:</label>}
            {
                isCustomColor &&
                <input
                    id="customColor"
                    type="color"
                    defaultValue={props.invitation?.dressColorCode}
                    className=""
                />
            }
            {/* <div className="flex gap-2 h-10">
                <p className="w-20 bg-red-500">red</p>
                <p className="w-20 bg-black text-white">black</p>
                <p className="w-20 bg-white text-black">white</p>
                <p className="w-20 bg-white text-black">custom</p>
                <input className="" type="color" />
            </div> */}
            
            <div className="flex justify-center gap-6">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 border-blue-500 text-white font-bold py-2 px-4 rounded"
                >{props.invitation ? "Save" : "Create"}
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}>Cancel
                </button>
            </div>
        </form>
    )
};