const Check = ({
  name,
  label,
  handleChecked,
}: {
  name: string;
  label?: string;
  handleChecked: any;
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          value={name}
          onChange={handleChecked}
          className="checkbox checkbox-accent rounded-full"
        />
        <span className="label-text capitalize">
          {label || name.split("-").join(" ")}
        </span>
      </label>
    </div>
  );
};

export default Check;
