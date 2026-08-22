import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  className,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={
          name === "confirmPassword" ||
          name === "newPassword" ||
          name === "confirmNewPassword"
            ? "new-password"
            : "current-password"
        }
        className={`${className} pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 hover:text-ink/70 dark:hover:text-paper/70 transition-colors duration-200"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
