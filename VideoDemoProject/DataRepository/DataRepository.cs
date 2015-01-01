using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;


namespace VideoDemoProject.DataRepository
{
    public class DataRepository<T> : IDataRepository<T> where T : class
    {
        private DbContext _dbContext;
        private DbSet<T> _dbSet;

        public void DataRepositry(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }
        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public int TotalCount
        {
            get { return _dbSet.Count(); }
        }

        public T Add(T entity)
        {
            var addentity = _dbSet.Add(entity);
            return addentity;
        }

        public void Attach(T entity)
        {
            _dbSet.Attach(entity);
        }

        public void Update(T entity)
        {
            var entry = _dbContext.Entry(entity);
            entry.State = EntityState.Modified;
        }

        public void SaveChange()
        {
            _dbContext.SaveChanges();
        }

        public T Find(params object[] keys)
        {
            var find = _dbSet.Find(keys);
            return find;
        }

        public T GetById(object id)
        {
            var getid = _dbSet.Find(id);
            return getid;
        }

        public void Delete(object id)
        {
            var delete = _dbSet.Find(id);
            Delete(delete);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public IQueryable<T> Fetch(Expression<Func<T, bool>> predicate)
        {
            var fetch = _dbSet.Where(predicate);
            return fetch;
        }

        public T FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            var firstordefault = _dbSet.FirstOrDefault(predicate);
            return firstordefault;
        }

        public T First(Func<T, bool> predicate)
        {
            var first = _dbSet.First(predicate);
            return first;
        }

        public T Single(Func<T, bool> predicate)
        {
            var single = _dbSet.Single(predicate);
            return single;
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet;
        }

        public bool Contains(Expression<Func<T, bool>> predicate)
        {
            var contain = _dbSet.Any(predicate);
            return contain;
        }
    }
}