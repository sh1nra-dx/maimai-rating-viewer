<?php
declare(strict_types = 1);

namespace app\core;

use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\Handle;
use think\exception\HttpException;
use think\exception\HttpResponseException;
use think\exception\ValidateException;
use think\Response;
use Throwable;

use app\exception\BadRequest;
use app\exception\NotFound;

/**
 * 应用异常处理类
 */
class ExceptionHandle extends Handle
{
    /**
     * 不需要记录信息（日志）的异常类列表
     * @var array
     */
    protected $ignoreReport = [
        HttpException::class,
        HttpResponseException::class,
        ModelNotFoundException::class,
        DataNotFoundException::class,
        ValidateException::class,
        BadRequest::class,
        NotFound::class,
    ];

    /**
     * 记录异常信息（包括日志或者其它方式记录）
     *
     * @access public
     * @param  Throwable $exception
     * @return void
     */
    public function report(Throwable $exception): void
    {
        // 使用内置的方式记录异常日志
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @access public
     * @param \think\Request   $request
     * @param Throwable $e
     * @return Response
     */
    public function render($request, Throwable $e): Response
    {
        /* 添加自定义异常处理机制 */

        // 表单验证失败错误
        if ($e instanceof ValidateException) {
            $data = array(
                'error' => $e->getError(),
            );
            return failedResponse(400, $data);
        }
        // 400错误
        if ($e instanceof BadRequest) {
            $data = array(
                'error' => $e->getMessage(),
            );
            return failedResponse(400, $data);
        }
        // 404错误
        if ($e instanceof NotFound) {
            $data = array(
                'error' => $e->getMessage(),
            );
            return failedResponse(404, $data);
        }
        // 应用运行时发生的其他异常
        if ($e instanceof Exception) {
            $data = array(
                'error' => $e->getMessage(),
            );
            if (Env::get('APP_DEBUG')) {
                $data['debugInfo'] = array(
                    'file'  => $e->getFile(),
                    'line'  => $e->getLine(),
                    'trace' => $e->getTrace(),
                );
            }
            return failedResponse(500, $data);
        }

        /* 其他错误交给系统处理 */
        return parent::render($request, $e);
    }
}
