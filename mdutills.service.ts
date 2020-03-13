import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as bigInt from 'json-bigint';
import * as _ from "lodash";
import * as moment from 'moment';
import { TitleCasePipe } from '../pipes/pipe';
declare var $;

@Injectable()
export class MdutillsService {

    constructor() { }

}

export class MDDateConverter {
    ConverttoLocalDate(date): Date {
        if (!date) return null;

        if (date instanceof Date) {
            date = this.hasTimezone(date) ? this.removeZ(date) : date;
            date = moment(date).format('MM/DD/Y h:mm:ss');
            date = new Date(date);
        }

        return date;
    }

    ConvertDate(date): any {
        if (!date) return null;

        if (date instanceof Date) {
            date = this.hasTimezone(date) ? this.removeZ(date) : date;
            date = moment(date).format('Y-MM-DD h:mm:ss');
        }

        return date;
    }

    StringTimeToDateTime(objTime: string) {
        if (!objTime) return;

        return new Date("01/01/1900 " + objTime);
    }

    DateTimeToTime(date) {
        if (!date) return '';

        return moment(date).format('HH:mm:ss');
    }

    formatTimeAMPM(time) {
        if (!time) return time;

        return moment(this.StringTimeToDateTime(time)).format('hh:mm A');
    }

    /**
  * Request Date type variable,
  * Returns Date in MM/DD/YYYY format and binds with datepicker.
  */
    //modified in effect of task 180562--start
    formatDate(date, format = 'MM/DD/YYYY'): any {
        if (!date) return;

        date = this.hasTimezone(date) ? this.removeZ(date) : new Date(date);
        return moment(date).format(format);
    }
    //modified in effect of task 180562--end
    CheckIfValidYearIsEntered(date: any): any {
        if (date != null) {
            var enteredDateYear = date.getFullYear();

            if (enteredDateYear < new Date().getFullYear()) {
                return date = null;
            }
            if (enteredDateYear > new Date().getFullYear()) {
                return date = null;
            }
            return date;
        }
        else
            return new Date();
    }
    getCurrentDateTime() {
        return new Date().getTime();
    }
    toDateTime(stringDate) {
        return new Date(stringDate).getTime();
    }

    private hasTimezone(value) {
        if (typeof value !== 'string') return false;
        return (value.includes('T') || value.includes('t'));
    }

    private removeZ(value) {
        if (!value) return '';
        return value.replace(/z|Z/, '');
    }
    //Waleed
    getBussinessDay(date) {
        let day = new Date(date).getDay();
        if (day != 0 && day != 6) {
            return date;
        }

        else {
            return false;
        }

    }
    getMonthlyWeekday(n, d, m, y) {
        //         * Parameters:
        //         * n = 1 - 5 for first, second, third, fourth or fifth weekday of the month
        //         * d = full spelled out weekday Monday - Friday
        //         * m = Full spelled out month like June
        //         * y = Four digit representation of the year like 2017
        var targetDay, curDay = 0, i = 1, seekDay;
        if (d == "Sunday") seekDay = 0;
        else if (d == "Monday") seekDay = 1;
        else if (d == "Tuesday") seekDay = 2;
        else if (d == "Wednesday") seekDay = 3;
        else if (d == "Thursday") seekDay = 4;
        else if (d == "Friday") seekDay = 5;
        else if (d == "Saturday") seekDay = 6;
        else if (!isNaN(d)) seekDay = d;
        while (curDay < n && i < 31) {
            targetDay = new Date(i++ + " " + m + " " + y);
            if (targetDay.getDay() == seekDay) curDay++;
        }
        if (curDay == n) {
            return targetDay;
        }
        else {
            return false;
        }
    }
    getLastSpecificDay(specificDay, month, year) {
        var n;
        if (specificDay == "Sunday") n = 0;
        else if (specificDay == "Monday") n = 1;
        else if (specificDay == "Tuesday") n = 2;
        else if (specificDay == "Wednesday") n = 3;
        else if (specificDay == "Thursday") n = 4;
        else if (specificDay == "Friday") n = 5;
        else if (specificDay == "Saturday") n = 6;
        else if (!isNaN(specificDay)) n = specificDay;
        var d = new Date();
        if (year) {
            d.setFullYear(year);
        }
        d.setDate(1); // Roll to the first day of ...
        d.setMonth(month || d.getMonth() + 1); // ... the next month.
        do { // Roll the days backwards until Monday.
            d.setDate(d.getDate() - 1);
        }
        while (d.getDay() !== n);
        return d;
    }
    addMonthsToDate(date, n) {
        return new Date(date.setMonth(date.getMonth() + n));
    }
    getCurrentMonthName(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[date.getMonth()];
    }
    getMaxDate(datesList) {
        let dates = datesList.map(d => moment(d)),
            maxDate = moment.max(dates);
        return maxDate;
    }
    getSpecificDayofCurrentWeek(date, day: number) {
        var ret = new Date(date ? date : new Date());
        ret.setDate(ret.getDate() + (day - ret.getDay()) % 7);
        return ret;
    }
    getDateFromTimeString(timeString: string) {
        let timeFormat = timeString.replace(/[^a-z]/gi, '');
        let hourdigits = timeString.replace(timeFormat, '');
        let hour, minutes;
        let Time = new Array<string>();
        Time = hourdigits.split(":");
        if (Time.length > 0) {
            hour = Time[0];
            hour = parseInt(hour);
            minutes = Time[1];
            minutes = parseInt(minutes);
        }
        let d = new Date();
        let currentDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        currentDate = currentDate + ' ' + hour + ':' + minutes + ' ' + timeFormat;
        let result = new Date(currentDate);
        return result;
    }
    ConvertDateOnly(date): any {

        if (!date) return null;

        if (date instanceof Date) {
            date = this.hasTimezone(date) ? this.removeZ(date) : date;
            date = moment(date).format('MM/DD/Y');
        }

        return date;
    }
    ConvertTimeWithAMPM(date): any {
        if (!date) return null;

        if (date instanceof Date) {
            date = this.hasTimezone(date) ? this.removeZ(date) : date;
            date = moment(date).format('Y-MM-DD hh:mm A'); //h:mm:ss A
            //date = new Date(date);
        }

        return date;
    }
    //Changed by M.Faisal -- start
    GetDateTimeFromDate(date: string) {

        if (date != null && date != undefined && date != "") {
            if (new Date(date) instanceof Date) {
                let DateTime = new Date(date).toLocaleString();
                return DateTime.toString();
            }
        }
        return "";
    }
    //Changed by M.Faisal -- end
    ValidateDateToSearch(date: string): boolean {
        if (!date) return false;
        let dateRegexWithSlash = /^((0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1])\/((19|20)\d\d))$/gm; //MM/DD/YYYY
        let dateRegexWithHyphen = /^((0[1-9]|1[0-2])[-]((0|1)[0-9]|2[0-9]|3[0-1])[-]((19|20)\d\d))$/gm; //MM-DD-YYYY

        if (date.match(dateRegexWithSlash) || date.match(dateRegexWithHyphen)) {
            return true;
        }
        return false;
    }
    ValidateDateRegex(date: string): boolean {
        if (!date) return false;
        let dateRegex = /((0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1])\/((19|20)\d\d))$/gm; //MM/DD/YYYY
        if (!date.match(dateRegex)) {
            return false;
        }
        return true;
    }
    //   ValidateDateRegexWithSlash(event:any)
    //   {
    //     let value: any = (event.value as HTMLInputElement).value;
    //     console.log(value);
    //       //if (!value) return;
    //       let dateRegex = /((0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1])\/((19|20)\d\d))$/gm; //MM/DD/YYYY
    //       if (!value.match(dateRegex))
    //       {
    //         event.preventDefault();
    //         return;
    //       }
    //   }
    DateValidation(date) {
        if (date instanceof Date) {
            if (date.getFullYear() < 1900) {
                return false;
            }
            return true;
        }
        else if (typeof (date) === 'string' && date != '') {
            if (new Date(date).getFullYear() < 1900) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }

    ValidateDate(date): any {
        date = this.ConvertDateOnly(date);
        if (!date || new Date(date).getFullYear() < 1900) return false;
        return this.ConvertDate(new Date(date));
    }
    DateRangeAndNullValidation(date) {
        let fDate = this.ConvertDateOnly(date);
        if (this.ValidateDateRegex(fDate) && this.ValidateDate(fDate)) {
            return true;
        }
        else {
            return false;
        }
    }
}
export class InputValidations {


    titleCasePipe: TitleCasePipe = new TitleCasePipe();

    NameValidation(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 32 || event.which === 13) {
            return true;
        }
        if (
            event.which === 91 ||
            event.which === 92 ||
            event.which === 93 ||
            event.which === 94 ||
            event.which === 95 ||
            event.which === 45 ||
            event.which === 96
        ) {
            event.preventDefault();
            return;
        }
        if (
            (event.which < 65 || event.which > 122) &&
            event.which != 8 &&
            event.keyCode != 9 &&
            event.which != 45
        ) {
            event.preventDefault();
            return;
        }
    }
    NameValidationWithQuoteAndDot(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 32 || event.which === 13 || event.which === 39 || event.which === 46) {
            return true;
        }
        if (
            event.which === 91 ||
            event.which === 92 ||
            event.which === 93 ||
            event.which === 94 ||
            event.which === 95 ||
            event.which === 45 ||
            event.which === 96
        ) {
            event.preventDefault();
            return;
        }
        if (
            (event.which < 65 || event.which > 122) &&
            event.which != 8 &&
            event.keyCode != 9 &&
            event.which != 45
        ) {
            event.preventDefault();
            return;
        }
    }
    HandleNPIPaste(event: ClipboardEvent) {
        if (event) {
            let clipboardData = event.clipboardData;
            let value: string = clipboardData.getData('text');
            if (!Number(value)) {
                event.preventDefault();
                return;
            }
            if (value.length > 10) {
                event.preventDefault();
                return;
            }
        }
    }
    HandleYIPPaste(event: ClipboardEvent) {
        if (event) {
            let clipboardData = event.clipboardData;
            let value: string = clipboardData.getData('text');
            if (!Number(value)) {
                event.preventDefault();
                return;
            }
        }
    }
    HandlePaste(event: ClipboardEvent) {
        if (event) {
            let clipboardData = event.clipboardData;
            let value: string = clipboardData.getData('text');
            event.preventDefault();
        }
    }
    NameValidationWithQuoteDotAndHyphen(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 32 || event.which === 13 || event.which === 39 || event.which === 46 || event.which === 45) {
            return true;
        }
        if (
            event.which === 91 ||
            event.which === 92 ||
            event.which === 93 ||
            event.which === 94 ||
            event.which === 95 ||
            event.which === 45 ||
            event.which === 96
        ) {
            event.preventDefault();
            return;
        }
        if (
            (event.which < 65 || event.which > 122) &&
            event.which != 8 &&
            event.keyCode != 9 &&
            event.which != 45
        ) {
            event.preventDefault();
            return;
        }
    }
    numberOnlyLengthRestrict(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which == 13) {
            return true;
        }
        if ((value.length == 2 || value.length == 5)) {
            if (event.which != 47) {
                (event.target as HTMLInputElement).value = value + "/";
            }
            return;
        }
        if (value.length > 9) {
            event.preventDefault();
            return;
        }
        if (event.which === 46 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }
        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which === 110 || event.which === 190) && !value.length) {
            event.preventDefault();
            return;
        }
        if (
            (event.which < 48 || event.which > 57) &&
            event.which != 8 &&
            event.keyCode != 9 &&
            event.keyCode != 37 &&
            event.keyCode != 39
        ) {
            event.preventDefault();
            return;
        }
    }
    phoneValidation(event: any) {
        let value: any = (event.target as HTMLInputElement).value;

        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }

        if ((event.which === 110 || event.which === 190) && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 57) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }
    phoneValidationWithLength(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (value.length == 10 && !(document.getSelection().toString() === value)) {
            event.preventDefault();
            return;
        }

        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }

        if ((event.which === 110 || event.which === 190) && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 57) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }
    NumberValidationWithDot(event: any) {

        let value: any = (event.target as HTMLInputElement).value;

        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }

        if ((event.which === 110 || event.which === 190 || (event.which === 47)) && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which < 46 || event.which > 57) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }

    numberOnly(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 46 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }
        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which === 110 || event.which === 190) && !value.length) {
            event.preventDefault();
            return;
        }
        if (
            (event.which < 48 || event.which > 57) &&
            event.which != 8 &&
            event.keyCode != 9 &&
            event.keyCode != 37 &&
            event.keyCode != 39
        ) {
            event.preventDefault();
            return;
        }
    }
    NumberValidation(event: any) {
        let value: any = (event.target as HTMLInputElement).value;

        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }
        if (event.which === 37) {
            event.preventDefault();
            return;
        }

        if ((event.which === 110 || event.which === 190 || (event.which === 47)) && !value.length) {
            event.preventDefault();
            return;
        }
        if ((event.which <= 46 || event.which > 57) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }
    QuantityValidationWithGreaterthanZero(event: any) {

        let value: any = (event.target as HTMLInputElement).value;

        if ((event.which === 96 || event.which === 48) && !value.length) {
            event.preventDefault();
            return;
        }

        if (event.which === 37) {
            event.preventDefault();
            return;
        }

        if (event.which === 32 && !value.length) {
            event.preventDefault();
            return;
        }

        if ((event.which === 110 || event.which === 190) && !value.length) {
            event.preventDefault();
            return;
        }

        if ((event.which < 48 || event.which > 57) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }
    nameValidation(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 65 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 45)) {
            event.preventDefault();
            return;
        }
    }
    middlenameValid(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 65 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 45)) {
            event.preventDefault();
            return;
        }
    }
    alphanumeric(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 45)) {
            event.preventDefault();
            return;
        }
    }
    alphanumericWithoutHyphen(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 61 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9)) {
            event.preventDefault();
            return;
        }
    }
    alphanumericWithSpaces(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (!value && event.which === 32) {
            event.preventDefault();
            return;
        }

        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96 ||
            event.which === 58 || event.which === 59 || event.which === 60 || event.which === 61 || event.which === 62 || event.which === 63 || event.which === 64) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }
    alphaWithSpaces(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 65 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }
    ICDCPTValidate(event: any) {
        var filter = /[().,a-zA-Z0-9-]/;
        var key = "\\" + String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (filter.test(key) == false) {
            event.preventDefault();
            return;
        }
    }
    NumberValidationWithDashes(event: any) {
        var filter = /[0-9-]/;
        var key = "\\" + String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (filter.test(key) == false) {
            event.preventDefault();
            return;
        }
    }
    alphanumericWithCommaDotandSpaces(event: any) {
        var key;
        document.all ? key = event.keyCode : key = event.which;
        return ((key == 44 || key == 46) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 32 || (key >= 48 && key <= 57));
    }
    SearchPatientCriteriaValidation(searchCriteria: string): any {
        if (!searchCriteria) return "";
        let ValidDateMsg = "";
        let ValidNumber = "";
        let dateConverter: MDDateConverter = new MDDateConverter();
        searchCriteria = searchCriteria + "";
        if (searchCriteria.length > 50) {
            searchCriteria = searchCriteria.slice(0, 50);
        }
        let temparr = searchCriteria.split(/(\s+)/).filter((val) => val.trim().length > 0);
        let isDate: boolean = false;
        for (let i = 0; i < temparr.length; i++) {
            if (temparr[i].includes("/") || temparr[i].includes("-")) {
                if (!dateConverter.ValidateDateToSearch(temparr[i])) {
                    temparr[i] = "";
                    ValidDateMsg = "invaliddate";
                    isDate = true;
                }
            }
            else if (!temparr[i].match(/^[a-zA-Z0-9', ]*$/gm) || temparr[i] == "0") // Changed to [a-zA-Z0-9', ] from [a-zA-Z0-9, ] by Ali Hussnain to allow search for patient like o'neal.           
            {
                temparr[i] = "";
            }
            if (temparr[i].length > 50) {
                temparr[i] = temparr[i].substring(0, 50);
            }
        }
        if (!isNaN(Number(searchCriteria))) {
            if (Number(searchCriteria) > 9223372036854775807) {
                ValidNumber = "invalidNumber";
                return ValidNumber;
            }
        }
        if (temparr.length == 1 && isDate) {
            return ValidDateMsg;
        }
        else {
            return $.trim(temparr.join(" "));
        }
    }
    GetPhoneMask(strPhone: string): string {
        let one = strPhone.substr(0, 3);
        let two = strPhone.substr(3, 3);
        let three = strPhone.substr(6, 4);
        let final = "(" + one + ") " + two + "-" + three;
        return final;
    }


    resetPhoneNumber(value: any) {
        if (value != null && value != "" && value != undefined) {
            value = value.replace("(", "").replace(")", "").replace("-", "").replace("-", "").replace(" ", "").trim();
        }
        return value;
    }

    USFormatedPhone(val: any) {
        if (val != null && val != "" && val != undefined && val.indexOf("(") == -1) {
            val = "(" + val.substring(0, 3) + ") " + val.substring(3, 6) + "-" + val.substring(6, 10);
        }
        return val;
    }
    CheckActive() {
        var curr_loc = location.href;
        if (curr_loc.toLocaleLowerCase().includes('mainpatient/profile')) {
            $('#profile-header').addClass("active");
            $('#medical-history-header').removeClass("active");
            $('#request-appointment-header').removeClass("active");
            $('#appointment-history-header').removeClass("active");
        } else if (curr_loc.toLocaleLowerCase().includes('mainpatient/medical-history')) {
            $('#medical-history-header').addClass("active");
            $('#profile-header').removeClass("active");
            $('#request-appointment-header').removeClass("active");
            $('#appointment-history-header').removeClass("active");
        } else if (curr_loc.toLocaleLowerCase().includes('mainpatient/request-appointment')) {
            $('#request-appointment-header').addClass("active");
            $('#profile-header').removeClass("active");
            $('#medical-history-header').removeClass("active");
            $('#appointment-history-header').removeClass("active");
        } else if (curr_loc.toLocaleLowerCase().includes('mainpatient/appointment-history')) {
            $('#medical-history-header').removeClass("active");
            $('#profile-header').removeClass("active");
            $('#request-appointment-header').removeClass("active");
            $('#appointment-history-header').addClass("active");
        }
        else {
            $('#profile-header').addClass("active");
        }
    }
    restrictNameSpace(event: any) {
        let value: any = (event.target as HTMLInputElement).value;


        if (event.which === 32 && event.target.selectionStart === 0) {
            event.preventDefault();
            return;
        }
    }

    restrictFirstSpace(event: any) {

        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 32 && event.target.selectionStart === 0) {
            event.preventDefault();
            return;
        }
    }
    specialCharacterValidation(event: any) {
        if (event.which === 60 || event.which === 62 || event.which === 39) {
            event.preventDefault();
            return;
        }
    }
    alphaWithNumbers(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (!value && event.which === 32) {
            event.preventDefault();
            return;
        }

        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96 ||
            event.which === 58 || event.which === 59 || event.which === 60 || event.which === 61 || event.which === 62 || event.which === 63 || event.which === 64) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }

    alphaWithNumbersRestrictSpace(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 32) {
            event.preventDefault();
            return;
        }

        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96 ||
            event.which === 58 || event.which === 59 || event.which === 60 || event.which === 61 || event.which === 62 || event.which === 63 || event.which === 64) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }

    emailValidate(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 92 || event.which === 93 || event.which === 94 || event.which === 95 || event.which === 96) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 8) && (event.keyCode != 9) && (event.which != 46)) {
            event.preventDefault();
            return;
        }
    }

    apphabetsNumbersWithDashValidate(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 64 || event.which === 92 || event.which === 93 || event.which === 94
            || event.which === 95 || event.which === 96 || event.which === 61 || event.which === 59 || event.which === 58) {
            event.preventDefault();
            return;
        }
        if ((event.which < 48 || event.which > 122) && (event.which != 45) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }
    apphabetsWithCommaandSingleQValidate(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (event.which === 91 || event.which === 64 || event.which === 92 || event.which === 93 || event.which === 94
            || event.which === 95 || event.which === 96 || event.which === 61 || event.which === 59 || event.which === 58) {
            event.preventDefault();
            return;
        }
        if ((event.which < 65 || event.which > 90) && (event.which < 97 || event.which > 122) && (event.which != 44) && (event.which != 39) && (event.which != 32)) {
            event.preventDefault();
            return;
        }
    }

    inputToTitleCase(event: any) {
        let value: any = (event.target as HTMLInputElement).value;
        if (value) {
            event.target.value = this.titleCasePipe.transform(value);
        }

        return;


    }

    maskingPhoneNumber(number) {
        if (number != null && number != undefined && number.length > 9) {
            var s2 = ("" + number).replace(/\D/g, '');
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            var num = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
            return num;
        }
    }

    removePhoneNumber(number) {
        if (number != '' && number != undefined && number != null) {
            var num = ("" + number).replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
            return num;
        }
        return '';
    }
}
