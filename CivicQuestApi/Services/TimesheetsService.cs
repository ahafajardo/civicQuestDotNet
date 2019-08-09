using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CivicQuestApi.Models;
using CivicQuestApi.Services;

namespace CivicQuestApi.Services
{
    public class TimesheetsService
    {
        private readonly TimesheetsContext _context;

        public TimesheetsService(TimesheetsContext context)
        {
            _context = context;

            if (_context.Timesheets.Count() == 0)
            {
                // Create a new CQItem if collection is empty,
                // which means you can't delete all CQItems.
                _context.Timesheets.Add(new Timesheet { userId = 1, notes = "Your notes here..." });
                _context.SaveChanges();
            }
        }

        public async Task<IEnumerable<Timesheet>> GetTimesheets(long userId)
        {
            return await _context.Timesheets.Where(t => t.userId == userId).ToListAsync();
        }

        public async Task<Timesheet> GetTimesheet(long i, long uI)
        {
            var timesheets = await GetTimesheets(uI);
            var timesheet = timesheets.FirstOrDefault<Timesheet>(t => t.id == i);

            if (timesheet == null)
                return null;
            return timesheet;
        }

        public async Task<Timesheet> PostTimesheet(long userId, Timesheet sheet)
        {
            if (userId != sheet.userId)
            {
                return null;
            }
            _context.Timesheets.Add(sheet);
            await _context.SaveChangesAsync();
            var timesheets = await GetTimesheets(sheet.userId);
            var finishedSheet = timesheets.FirstOrDefault<Timesheet>(t => t.id == sheet.id);

            return finishedSheet;
        }

        public async Task<Timesheet> PutTimesheet(long id, long userId, Timesheet sheet)
        {
            if (id != sheet.id || userId != sheet.userId)
            {
                return null;
            }
            _context.Entry(sheet).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return sheet;
        }

        public async Task<Timesheet> DeleteTimesheet(long i, long uI)
        {
            var timesheets = await GetTimesheets(uI);
            var timesheet = timesheets.FirstOrDefault<Timesheet>(t => t.id == i);
            if (timesheet == null)
            {
                return null;
            }
            _context.Remove(timesheet);
            await _context.SaveChangesAsync();

            return timesheet;
        }
    }
}
