import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { groupList } from "../actions/groupActions";
import { updateJournalGroupsAction } from "../actions/journalActions";

const GroupSelectModal = ({ show, onHide, postId }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const dispatch = useDispatch();

  const group = useSelector((state) => state.groupList);
  const { loading, groups } = group;

  useEffect(() => {
    if (show) {
      dispatch(groupList());
    }
  }, [show, dispatch]);

  const handleGroupSelect = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSave = () => {
    dispatch(updateJournalGroupsAction(postId, selectedGroups));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Groups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Form>
            {groups.map((group) => (
              <Form.Check
                key={group._id}
                type="checkbox"
                label={group.groupName}
                checked={selectedGroups.includes(group._id)}
                onChange={() => handleGroupSelect(group._id)}
              />
            ))}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupSelectModal;
