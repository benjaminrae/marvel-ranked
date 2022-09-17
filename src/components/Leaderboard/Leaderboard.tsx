import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const Leaderboard = (): JSX.Element => {
    const [slice, setSlice] = useState(10);
    const [leaderboardData, setLeaderboardData] = useState<any[]>();

    useEffect(() => {
        getAndSetLeaderboardData();
    }, []);

    const getAndSetLeaderboardData = async () => {
        const votesRef = collection(db, "votes");
        const q = query(votesRef, orderBy("votes", "desc"), limit(slice));
        const querySnapshot = await getDocs(q);
        const newLeaderboardData: any[] = [];
        querySnapshot.forEach((doc) => {
            newLeaderboardData.push(doc.data());
        });
        setLeaderboardData(newLeaderboardData);
    };
    const mockData = [
        { name: "ant-man", votes: 1000 },
        { name: "iron man", votes: 1453 },
        { name: "hulk", votes: 999 },
    ];
    return (
        <table>
            {leaderboardData && (
                <tbody className="leaderboard__table-body">
                    {leaderboardData.map((data, index) => {
                        return (
                            <tr className="leaderboard__row" key={index}>
                                <td>#{index + 1}</td>
                                <td>
                                    <img
                                        src={data.thumbnailUrl}
                                        alt={data.name}
                                    />
                                </td>
                                <td>{data.name}</td>
                                <td>{data.votes}</td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
    );
};

export default Leaderboard;
