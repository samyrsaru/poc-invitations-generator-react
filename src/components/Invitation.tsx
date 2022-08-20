// interface IInvitationProps {
//     eventName: string;
//     description: string
// }

import { useEffect, useState } from "react";
import { IInvitation } from "../IInvitation";
import { BsImageAlt } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { GoLocation } from 'react-icons/go';
import { GiAmpleDress } from "react-icons/gi";


export const Invitation = (props: {
        invitation: IInvitation,
        onDelete?: () => void,
        onEdit?: () => void,
    } ) => {
    
    const [jsonMode, setJsonMode] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [sliceDescription, setSliceDescription] = useState(false);
    const [seeMoreLess, setSeeMoreLess] = useState("See more");

    useEffect(() => {
        if  (props.invitation.description.length > 150) {
            setSliceDescription(true);
            setSeeMore(true);
        }
    }, []);
    
    const toggleSeeMoreLess = () => {
        if (seeMoreLess === "See more") {
            setSeeMoreLess("See less");
            setSliceDescription(false);
        } else {
            setSeeMoreLess("See more");
            setSliceDescription(true);
        }
    };

    const removeInvitation = () => {
        props.onDelete?.();
    }

    const edit = () => {
        props.onEdit?.();
    }

    return (
        <div className="bg-gray-50 text-black flex flex-col sm:flex-row items-stretch justify-between">
            {
                jsonMode
                ?
                    <code
                        className="py-4 px-2">
                        {JSON.stringify(props.invitation)}
                    </code>
                :
                    <div className="flex flex-col sm:flex-row items-stretch w-full">
                        <div className="flex-shrink-0 w-full sm:w-40 bg-blue-300 flex items-center justify-center aspect-square">
                            <BsImageAlt/>
                        </div>
                        <div className="p-2 flex flex-col gap-2 w-full">
                            <div className="flex justify-between gap-2">
                                <h1 className="uppercase font-bold mb-2 flex-grow">{props.invitation.name}</h1>
                                <button
                                    onClick={edit}
                                    className="text-lg hover:text-2xl"
                                ><AiOutlineEdit /></button>
                                <button
                                    onClick={removeInvitation}
                                    className="text-lg hover:text-2xl"
                                ><AiOutlineDelete/></button>
                            </div>
                            
                            <div className="flex">
                                <CgDetailsMore className="mr-2 flex-shrink-0"/>
                                <p>{sliceDescription ? props.invitation.description.slice(0, 150) : props.invitation.description}</p>
                            </div>
                            {seeMore && <button className="text-sm self-end hover:bg-slate-200 px-2" onClick={toggleSeeMoreLess}>{seeMoreLess}</button>}

                            <p className="font-bold flex items-center">
                                <AiOutlineFieldTime className="mr-2"/><span className="font-normal">{props.invitation.eventDate?.toDateString()}</span>
                            </p>

                            <p className="font-bold flex items-center">
                                <GoLocation className="mr-2"/><span className="font-normal">{props.invitation.location}</span>
                            </p>

                            {
                                props.invitation.dressColorCode === "none"
                                    ? <p className="flex items-center"><GiAmpleDress/>No dress code proposed</p>
                                    : <div className="flex items-center">
                                        <GiAmpleDress className="shrink-0"/>
                                        <p>We'd appreciate if you'd use a <span className="font-bold"> {props.invitation.dressColorCode}
                                        </span> <span className="w-10 h-4" style={{ backgroundColor: props.invitation.dressColorCode, color: props.invitation.dressColorCode }}> ---- </span>dress collor theme
                                        </p>
                                    </div>
                            }
                        </div>
                    </div>
            }
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 basis-2 "
                onClick={() => setJsonMode(!jsonMode)}
            >Toggle stringify</button>
        </div>
    )
};