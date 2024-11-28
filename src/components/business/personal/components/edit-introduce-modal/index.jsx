
/* eslint-disable react/react-in-jsx-scope */
import { memo, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import isEqual from "react-fast-compare";
import Hobbies from "./hobbies";
import SocialMediaFieldList from "./social-media-field-list";

const EditIntroduce = ({
  show,
  onToggle,
  title,
  onUpdate,
  userInfo,
  onChangeIntroduce,
}) => {
  const TabItemList = [
    { key: 'Hobbies', component: <Hobbies hobbies={userInfo.hobbies} onChangeHobbies={onChangeIntroduce} /> },
    { key: 'Social', component: <SocialMediaFieldList userInfo={userInfo} onChangeSocialLink={onChangeIntroduce} /> },
  ]

  const [activeKey, setActiveKey] = useState(TabItemList[0].key);

  const onSelectTab = (key) => {
    setActiveKey(key);
  }

  return (
    <Modal
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onToggle}
      className="text-white"
    >
      <Modal.Header closeButton className="bg-black" closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black">
        <Tabs
          activeKey={activeKey}
          onSelect={onSelectTab}
          className="mb-3 [&>.nav-item>button]:text-white"
          fill
        >
          {TabItemList.map((item) => (
            <Tab key={item.key} eventKey={item.key} title={<span className="fs-4 text-capitalize font-bold">{item.key}</span>}>
              {item.component}
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="bg-black flex gap-2">
        <Button
          onClick={onToggle}
          className="rounded-3 text-white"
          variant="outline-secondary"
        >
          Close
        </Button>
        <Button
          onClick={onUpdate}
          className="rounded-3"
          style={{
            background: "var(--color-primary)",
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(EditIntroduce, isEqual);
