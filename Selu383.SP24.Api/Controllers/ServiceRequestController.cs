using System.Diagnostics;
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

namespace Selu383.SP24.Api.Controllers;

[Route("api/servicerequest")]
[ApiController]
public class ServiceRequestController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;

    public ServiceRequestController(
        DataContext dataContext,
        UserManager<User> userManager,
        ILogger<ServiceRequestController> logger,
        IMapper mapper
    )
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
            var serviceRequest = _context
                .ServiceRequests.Include(sr => sr.RequestStatus)
                .Include(sr => sr.User)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Hotel)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Package)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.RoomStatus)
                .ToList();

            return (serviceRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the GetAllServiceRequest request."
            );
            return Enumerable.Empty<ServiceRequest>();
        }
    }

    [HttpGet("GetServiceRequestByStatus")]
    public async Task<ActionResult<ServiceRequest>> GetServiceRequestByStatus(string status)
    {
        try
        {
            var serviceRequest = await _context
                .ServiceRequests.Where(sr => sr.RequestStatus.Status == status)
                .Include(sr => sr.RequestStatus)
                .Include(sr => sr.User)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Hotel)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Package)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.RoomStatus)
                .ToListAsync();

            if (serviceRequest == null)
            {
                return NotFound($"There are no service requests with the status '{status}' ");
            }

            return Ok(serviceRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the GetServiceRequestByStatus request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("GetServiceRequestById")]
    public async Task<ActionResult<ServiceRequest>> Get(int id)
    {
        try
        {
            var serviceRequest = await _context
                .ServiceRequests.Include(sr => sr.RequestStatus)
                .Include(sr => sr.User)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Hotel)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.Package)
                .Include(sr => sr.Room)
                .ThenInclude(r => r.RoomStatus)
                .FirstOrDefaultAsync(sr => sr.Id == id);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            return Ok(serviceRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the GerServiceRequestById request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPost("CreateServiceRequest")]
    public async Task<ActionResult<ServiceRequestDTO>> CreateServiceRequest(
        CreateServiceRequestDTO serviceRequestDTO
    )
    {
        try
        {
            var requestStatus = _context
                .UniversalStatuses.Where(x => x.Status == "Pending")
                .FirstOrDefault();

            var user = await _userManager.GetUserAsync(User);

            var request = new ServiceRequest
            {
                Request = serviceRequestDTO.Request,
                RoomId = serviceRequestDTO.RoomId,
                CreatorId = user.Id,
                RequestStatusId = requestStatus.Id,
                CreateDate = DateTime.Now,
            };

            _context.ServiceRequests.Add(request);
            await _context.SaveChangesAsync();

            var serviceRequestDTOToReturn = _autoMapper.Map<ServiceRequestDTO>(request);

            return Ok(serviceRequestDTOToReturn);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the CreateServiceRequest request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPost("StartServiceRequest")]
    public async Task<ActionResult<ServiceRequest>> StartService(int serviceRequestId)
    {
        try
        {
            var requestStatus = _context
                .UniversalStatuses.Where(x => x.Status == "Started")
                .FirstOrDefault();

            var serviceRequest = await _context
                .ServiceRequests.Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.StartDate = DateTime.Now;
            serviceRequest.RequestStatusId = requestStatus.Id;

            _context.ServiceRequests.Update(serviceRequest);

            await _context.SaveChangesAsync();

            return Ok(true);
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
            var requestStatus = _context
                .UniversalStatuses.Where(x => x.Status == "Finished")
                .FirstOrDefault();

            var serviceRequest = await _context
                .ServiceRequests.Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.EndDate = DateTime.Now;
            serviceRequest.RequestStatusId = requestStatus.Id;

            _context.ServiceRequests.Update(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the FinishServiceRequest request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [Authorize]
    [HttpPost("CancelServiceRequest")]
    public async Task<ActionResult<bool>> CancelService(int serviceRequestId)
    {
        try
        {
            var requestStatus = _context
                .UniversalStatuses.Where(x => x.Status == "Cancelled")
                .FirstOrDefault();

            var serviceRequest = await _context
                .ServiceRequests.Include(_ => _.RequestStatus)
                .FirstOrDefaultAsync(sr => sr.Id == serviceRequestId);

            if (serviceRequest == null)
            {
                return NotFound("Service request was not found");
            }

            serviceRequest.EndDate = DateTime.Now;
            serviceRequest.RequestStatusId = requestStatus.Id;

            _context.ServiceRequests.Update(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the CancelService request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPut("UpdateServiceRequest")]
    public async Task<ActionResult<ServiceRequestDTO>> UpdateServiceRequest(
        CreateServiceRequestDTO serviceRequestDTO,
        int id
    )
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests.FirstOrDefaultAsync(sr =>
                sr.Id == id
            );

            if (serviceRequest == null)
            {
                return NotFound("Service request not found");
            }

            serviceRequest.RoomId = serviceRequestDTO.RoomId;
            serviceRequest.Request = serviceRequestDTO.Request;

            _context.ServiceRequests.Update(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the UpdateServiceRequest request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpDelete("DeleteServiceRequest")]
    public async Task<ActionResult<bool>> DeleteServiceRequest(int id)
    {
        try
        {
            var serviceRequest = await _context.ServiceRequests.FirstOrDefaultAsync(sr =>
                sr.Id == id
            );

            if (serviceRequest == null)
            {
                return NotFound("Could not find the service request you are looking for");
            }

            _context.ServiceRequests.Remove(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An error occurred while processing the DeleteServiceRequest request."
            );

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }
}
