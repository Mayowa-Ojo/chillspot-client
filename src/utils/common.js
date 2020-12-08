import { Text } from "slate";
import escapeHtml from "escape-html";
import { 
   parseISO,
   differenceInSeconds,
   differenceInMinutes,
   differenceInHours,
   differenceInDays,
   differenceInWeeks,
   differenceInMonths,
   differenceInYears
} from "date-fns";

export const parseTimeDiff = (date) => {
   date = parseISO(date);
   let diff;
   const isSecond = differenceInSeconds(new Date(), date) < 60;
   const isMinute = differenceInMinutes(new Date(), date) < 60;
   const isHour = differenceInHours(new Date(), date) < 24;
   const isDay = differenceInDays(new Date(), date) < 7;
   const isWeek = differenceInWeeks(new Date(), date) < 4;
   const isMonth = differenceInMonths(new Date(), date) < 12;

   if(isSecond) {
      diff = differenceInSeconds(new Date(), date);
      return `${diff} second${diff > 1 ? "s" : ""} ago`;
   }

   if(isMinute) {
      diff = differenceInMinutes(new Date(), date);
      return `${diff} minute${diff > 1 ? "s" : ""} ago`;
   }

   if(isHour) {
      diff = differenceInHours(new Date(), date);
      return `${diff} hour${diff > 1 ? "s" : ""} ago`;
   }

   if(isDay) {
      diff = differenceInDays(new Date(), date);
      return `${diff} day${diff > 1 ? "s" : ""} ago`;
   }

   if(isWeek) {
      diff = differenceInWeeks(new Date(), date);
      return `${diff} week${diff > 1 ? "s" : ""} ago`;
   }

   if(isMonth) {
      diff = differenceInMonths(new Date(), date);
      return `${diff} month${diff > 1 ? "s" : ""} ago`;
   }

   diff = differenceInYears(new Date(), date);
   return `${diff} year${diff > 1 ? "s" : ""} ago`;
}

export const serializer = (value) => {
   const serialize = node => {
      if(node.bold) return `<strong>${escapeHtml(node.text)}</strong>`;
      if(node.italic) return `<em>${escapeHtml(node.text)}</em>`;
      if (Text.isText(node)) {
         return escapeHtml(node.text)
      }

      const children = node.children.map(n => serialize(n)).join('')

      switch (node.type) {
         case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
         case 'paragraph':
            return `<p>${children}</p>`
         case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
         case 'ordered-list':
            return `<ol>${children}</ol>`
         case 'unordered-list':
            return `<ul>${children}</ul>`
         case 'list-item':
            return `<li>${children}</li>`
         case 'block-quote':
            return `<blockquote>${children}</blockquote>`
         default:
            return children
      }
   }

   return serialize({ children: value });
}