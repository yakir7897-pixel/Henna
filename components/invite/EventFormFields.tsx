import { ENTRANCE_EFFECTS, toEntranceEffect, type EventFormValues } from "@/lib/invite/types";
import { CoverImageUploader } from "./CoverImageUploader";

const inputClass =
  "w-full rounded border border-neutral-300 p-2 text-sm focus:border-primary focus:outline-none";
const labelClass = "block text-sm font-medium text-neutral-700";

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sm:col-span-2">
      <h3 className="mb-3 text-sm font-semibold text-muted">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function EventFormFields({
  values,
  onChange,
}: {
  values: EventFormValues;
  onChange: (patch: Partial<EventFormValues>) => void;
}) {
  return (
    <>
      <FieldGroup title="פרטי האירוע">
        <div className="sm:col-span-2">
          <label className={labelClass}>שם האירוע</label>
          <input
            className={inputClass}
            value={values.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="החינה של יקיר ותהל"
            required
          />
        </div>
        <div>
          <label className={labelClass}>שמות המארחים</label>
          <input
            className={inputClass}
            value={values.hostNames}
            onChange={(e) => onChange({ hostNames: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>תאריך ושעה</label>
          <input
            type="datetime-local"
            className={inputClass}
            value={values.eventDate}
            onChange={(e) => onChange({ eventDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>שם המקום</label>
          <input
            className={inputClass}
            value={values.venueName}
            onChange={(e) => onChange({ venueName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>כתובת</label>
          <input
            className={inputClass}
            value={values.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>קישור ניווט (Waze / Google Maps)</label>
          <input
            className={inputClass}
            dir="ltr"
            value={values.mapsUrl}
            onChange={(e) => onChange({ mapsUrl: e.target.value })}
            placeholder="https://waze.com/ul?..."
          />
        </div>
      </FieldGroup>

      <FieldGroup title="מדיה ואפקטים">
        <div>
          <label className={labelClass}>תמונת רקע להזמנה</label>
          <CoverImageUploader
            value={values.coverImageUrl}
            onChange={(url) => onChange({ coverImageUrl: url })}
          />
        </div>
        <div>
          <label className={labelClass}>תמונה למסך הפתיחה (לפני ההזמנה)</label>
          <CoverImageUploader
            value={values.loadingImageUrl}
            onChange={(url) => onChange({ loadingImageUrl: url })}
          />
        </div>
        <div>
          <label className={labelClass}>אפקט כניסה להזמנה</label>
          <select
            className={inputClass}
            value={values.entranceEffect}
            onChange={(e) => onChange({ entranceEffect: toEntranceEffect(e.target.value) })}
          >
            {ENTRANCE_EFFECTS.map((effect) => (
              <option key={effect.value} value={effect.value}>
                {effect.label}
              </option>
            ))}
          </select>
        </div>
      </FieldGroup>

      <FieldGroup title="הודעה לאורחים">
        <div className="sm:col-span-2">
          <label className={labelClass}>תיאור / הודעה אישית לאורחים</label>
          <textarea
            className={inputClass}
            rows={3}
            value={values.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>
      </FieldGroup>
    </>
  );
}
