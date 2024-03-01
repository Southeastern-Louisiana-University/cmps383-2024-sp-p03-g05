using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySqlX.XDevAPI.Common;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;
using System.Diagnostics;

namespace Selu383.SP24.Api.Controllers;

[Route("api/servicerequests")]
[ApiController]
public class ServiceRequestController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;

    public ServiceRequestController(DataContext dataContext, UserManager<User> userManager, ILogger<ServiceRequestController> logger, IMapper mapper)
    {
        this._context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
    }

    [HttpGet("GetAllServiceRequest")]
    public IEnumerable<ServiceRequest> Get()
    {
        try
        {
            return _context.ServiceRequests
                .Include(sr => sr.RequestStatus)
                .Include(sr => sr.User)
                .Include(sr => sr.Room).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the GetAllServiceRequest request.");
            return Enumerable.Empty<ServiceRequest>();
        }
    }
    [HttpGet("GetServiceRequestByStatus")]
    public async Task<ActionResult<ServiceRequestDTO>> GetServiceRequestByStatus(string status)
    {
        var statusIds = await _context.UniversalStatuses
            .Where(us => us.Status == status)
            .Select(us => us.Id)
            .ToListAsync();

        var serviceRequests = await _context.ServiceRequests
            .Where(sr => statusIds.Contains(sr.RequestStatusId))
            .ToListAsync();

        var serviceRequestDTOs = _autoMapper.Map<List<ServiceRequestDTO>>(serviceRequests);

        return Ok(serviceRequestDTOs);
    }

    [HttpGet("GetServiceRequestById")]
    public async Task<ActionResult<ServiceRequest>> Get(int id)
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests
                 .Include(sr => sr.RequestStatus)
                 .Include(sr => sr.User)
                 .Include(sr => sr.Room)
                 .FirstOrDefaultAsync(sr => sr.Id == id);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            return Ok(serviceRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the GerServiceRequestById request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }


    [HttpPost("CreateServiceRequest")]
    public async Task<ActionResult<ServiceRequestDTO>> CreateServiceRequest(CreateServiceRequestDTO serviceRequestDTO)
    {
        try
        {
            var requestStatus = _context.UniversalStatuses
                .Where(x => x.Status == "Pending")
                .Select(x => x.Id)
                .FirstOrDefault();

            var user = await _userManager.GetUserAsync(User);

            var request = new ServiceRequest
            {
                Request = serviceRequestDTO.Request,
                RoomNumber = serviceRequestDTO.RoomNumber,
                CreatorId = user.Id,
                RequestStatusId = requestStatus,
                CreateDate = DateTime.Now,

            };

            _context.ServiceRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(serviceRequestDTO);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the CreateServiceRequest request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPost("StartServiceRequest")]
    public async Task<ActionResult<ServiceRequest>> StartService(int serviceRequestId)
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests
                .Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.StartDate = DateTime.Now;
            serviceRequest.RequestStatusId = _context.UniversalStatuses
                .Where(us => us.Status == "Started")
                .Select(x => x.Id)
                .FirstOrDefault();

            _context.ServiceRequests.Update(serviceRequest);

            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the StartService request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }

    }

    [HttpPost("FinishServiceRequest")]
    public async Task<ActionResult<ServiceRequest>> FinishService(int serviceRequestId)
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests
                .Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.EndDate = DateTime.Now;
            serviceRequest.RequestStatusId = _context.UniversalStatuses
                .Where(us => us.Status == "Finished")
                .Select(x => x.Id)
                .FirstOrDefault();

            _context.ServiceRequests.Update(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the FinishServiceRequest request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }

    }
    [Authorize]
    [HttpPost("CancelServiceRequest")]
    public async Task<ActionResult<bool>> CancelService(int serviceRequestId)
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests
                .Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.EndDate = DateTime.Now;
            serviceRequest.RequestStatusId = _context.UniversalStatuses
                .Where(us => us.Status == "Cancelled")
                .Select(x => x.Id)
                .FirstOrDefault();

            _context.ServiceRequests.Update(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the CancelService request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPut("UpdateServiceRequest")]
    public async Task<ActionResult<ServiceRequestDTO>> UpdateServiceRequest(CreateServiceRequestDTO serviceRequestDTO, int id)
    {
        var serviceRequest = await _context.ServiceRequests.FirstOrDefaultAsync(sr => sr.Id == id);

        if (serviceRequest == null)
        {
            return NotFound("Service request not found");
        }

        serviceRequest.RoomNumber = serviceRequestDTO.RoomNumber;
        serviceRequest.Request = serviceRequestDTO.Request;

        _context.ServiceRequests.Update(serviceRequest);
        await _context.SaveChangesAsync();

        return Ok();
    }
}

