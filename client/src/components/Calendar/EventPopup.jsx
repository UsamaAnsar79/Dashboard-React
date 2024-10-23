
import React from "react";
import Select from "react-select";

const EventPopup = ({
  popup,
  setPopup,
  popupEvent,
  setPopupEvent,
  popupSave,
  editingEvent,
  users,
}) => {
  if (!popup) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSelectChange = (selectedOptions) => {
    const userIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setPopupEvent((prev) => ({ ...prev, users: userIds })); // Set the selected user IDs
  };

  // Prepare user options for react-select
  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingEvent ? "Edit Event" : "Add Event"}</h5>
            <button type="button" className="btn-close" onClick={() => setPopup(false)}></button>
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={popupEvent.title || ""}
                onChange={handleChange}
                required
                placeholder="Enter event title"
              />
            </div>
            <div className="mb-2">
              <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                Description:
              </label>
              <textarea
                className="form-control"
                name="description"
                value={popupEvent.description || ""}
                onChange={handleChange}
                placeholder="Enter event description"
              ></textarea>
            </div>
            <div className="mb-2 d-flex">
              <div className="me-2 flex-fill">
                <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                  Start Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="startTime"
                  value={popupEvent.startTime || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-fill">
                <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                  End Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="endTime"
                  value={popupEvent.endTime || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={popupEvent.date ? popupEvent.date.split("T")[0] : ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label" style={{ color: "black", fontSize: "20px" }}>
                Users:
              </label>
              <Select
                isMulti
                options={userOptions}
                onChange={handleUserSelectChange}
                value={userOptions.filter((option) =>
                  popupEvent.users ? popupEvent.users.includes(option.value) : false
                )}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%", // Make sure it takes full width
                  }),
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={popupSave}>
              {editingEvent ? "Update" : "Save"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setPopup(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
