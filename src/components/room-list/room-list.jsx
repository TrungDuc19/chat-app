import { useContext } from "react";
import { Button, Collapse, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

import "./room-list.scss";
import { AppContext } from "../../context/app-provider";

const { Panel } = Collapse;
const { Link } = Typography;

const RoomList = () => {
    const { rooms, setAddRoomOpen, setSelectedRoom } = useContext(AppContext);

    const handleAddRoom = () => {
        setAddRoomOpen(true);
    }

    return (
        <Collapse className="room-list" ghost defaultActiveKey="1">
            <Panel className="panel" header="Danh sách các phòng" key="1">
                {
                    rooms.map(room => (
                        <Link key={room.id} className="room-item" onClick={() => setSelectedRoom(room)}>
                            {room.name}
                        </Link>
                    ))
                }
                <Button className="add-room" type="text" icon={<PlusSquareOutlined />} onClick={handleAddRoom}>
                    Thêm phòng
                </Button>
            </Panel>
        </Collapse>
    )
}

export default RoomList;