using System;

namespace CivicQuestApi.Models
{
    public class Timesheet
    {
        public long id { get; set; }
        public long userId { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
        public string notes { get; set; }
    }
}
